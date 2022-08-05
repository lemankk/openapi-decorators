import 'reflect-metadata';
import { ReferenceObject, SchemaObject } from 'openapi3-ts';
import type { MetadataStorage } from 'class-transformer/types/MetadataStorage';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';

/**
 * Reducing schema to be generate in output
 * @param listedSchemas
 * @param refPointerPrefix
 * @returns
 */
export const optimizeSchemas = (
  listedSchemas: Record<string, SchemaObject | ReferenceObject>,
  refPointerPrefix: string = '#/components/schemas/'
) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const defaultMetadataStorage: MetadataStorage = require('class-transformer/cjs/storage').defaultMetadataStorage;

  const schemas = validationMetadatasToSchemas({
    refPointerPrefix: refPointerPrefix,
    classTransformerMetadataStorage: defaultMetadataStorage, // 2) Define class-transformer metadata in options
  });
  const usageCountForSchemas = {};

  const pushSchemaCounter = (name: string, refName: string) => {
    const refNameWithoutPrefix = refName.replace(refPointerPrefix, '');
    if (!usageCountForSchemas[name].includes(refNameWithoutPrefix)) {
      usageCountForSchemas[name].push(refNameWithoutPrefix);
    }
    return refNameWithoutPrefix;
  };
  const scanDependencies = (name: string, input: SchemaObject | ReferenceObject | true) => {
    if (!input || input === true) {
      return;
    }
    if ((input as ReferenceObject).$ref) {
      // If that is not scanned yet, start it
      const nextName = pushSchemaCounter(name, (input as ReferenceObject).$ref);

      // Scan for next schema if its not started.
      if (!usageCountForSchemas[nextName]) {
        usageCountForSchemas[nextName] = [];
        scanDependencies(nextName, schemas[nextName]);
      }
      return;
    }
    const schema = input as SchemaObject;
    if (schema.allOf) {
      schema.allOf.forEach((child) => {
        scanDependencies(name, child);
      });
    }
    if (schema.oneOf) {
      schema.oneOf.forEach((child) => {
        scanDependencies(name, child);
      });
    }
    if (schema.anyOf) {
      schema.anyOf.forEach((child) => {
        scanDependencies(name, child);
      });
    }
    if (schema.not) {
      scanDependencies(name, schema.not);
    }
    if (schema.additionalProperties) {
      scanDependencies(name, schema.additionalProperties);
    }
    if (schema.patternProperties) {
      scanDependencies(name, schema.patternProperties);
    }
    if (schema.items) {
      scanDependencies(name, schema.items);
    }

    if (schema.properties) {
      Object.keys(schema.properties).forEach((propName) => {
        const prop = schema.properties[propName];
        scanDependencies(name, prop);
      });
    }
  };

  Object.keys(listedSchemas)
    .map((name) => {
      return {
        name,
        defObj: schemas[name] || listedSchemas[name],
      };
    })
    .forEach(({ name, defObj }) => {
      if (!usageCountForSchemas[name]) {
        usageCountForSchemas[name] = [];
      }
      scanDependencies(name, defObj);
    });

  const schemaRequired = Object.keys(usageCountForSchemas).reduce((map, name) => {
    return {
      ...map,
      [name]: schemas[name] || listedSchemas[name],
    };
  }, {});
  return schemaRequired;
};
