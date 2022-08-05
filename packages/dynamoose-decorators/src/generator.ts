/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getMetadataStorage } from 'class-validator';
import { targetConstructorToSchema } from 'class-validator-jsonschema';
import { SchemaDefinition } from 'dynamoose/dist/Schema';
import 'reflect-metadata';
import { getDynamooseMetadataStorage } from './metadata/getMetadataStorage';
import { ClassTransformerMetadataStorage, getDefaultMetadataStorage } from './utils';

function getPropType(target: object, property: string) {
  return Reflect.getMetadata('design:type', target, property);
}

/**
 * Convert model class into Dynamoose ModelSchema by using converting from class-transformer, class-validator and class-validator-jsonschema decorators
 * @param modelClass
 * @returns {SchemaDefinition}
 */
export function toDynamooseModelSchema(
  modelClass: Function,
  metadataStorage?: ClassTransformerMetadataStorage
): SchemaDefinition {
  const dynamooseMetadataStorage = getDynamooseMetadataStorage();
  const storage = getMetadataStorage();
  const modelMetadata = storage.getTargetValidationMetadatas(modelClass, '', true, false);

  const _metadataStorage = metadataStorage || getDefaultMetadataStorage();

  const schema = targetConstructorToSchema(modelClass, {
    classTransformerMetadataStorage: _metadataStorage,
    classValidatorMetadataStorage: storage,
  });
  const modelSchema: SchemaDefinition = {};

  const { properties = {}, required = [] } = schema;
  if (properties) {
    Object.keys(properties).forEach((propName) => {
      const propInfo: any = properties[propName];
      if (!propInfo) {
        return;
      }
      let propSchema: any = null;
      let propType: any = Object;

      // console.log('>>> %s.propInfo[%s]=%o', modelClass.name, propName, propInfo)
      if (propInfo.type === 'string') {
        propType = String;
        if (propInfo.format === 'datetime') {
          propType = Date;
        }
      }
      if (propInfo.type === 'array') {
        // console.log('>>> Array')
        propType = Array;

        // Lookup for 'nestedValidation' to make sure that is defined as array
        const propMetadata = modelMetadata.find(
          (metadata) => metadata.propertyName === propName && metadata.type === 'nestedValidation'
        );

        if (propMetadata && typeof propMetadata.target === 'function') {
          const typeMeta = _metadataStorage.findTypeMetadata(propMetadata.target, propMetadata.propertyName);
          const modelTypeMeta = dynamooseMetadataStorage.findTypePropertyForModel(
            propMetadata.target,
            propMetadata.propertyName
          );
          const childType = typeMeta
            ? typeMeta.typeFunction()
            : modelTypeMeta
            ? modelTypeMeta.target
            : getPropType(propMetadata.target.prototype, propMetadata.propertyName);

          if (childType) {
            // For type = 'array', schema should be wrapped in the array format.
            propSchema = [
              {
                type: Object,
                schema: toDynamooseModelSchema(childType),
              },
            ];
          }
        }
      }
      if (propInfo.type === 'number' || propInfo.type === 'integer') {
        propType = Number;
      }
      if (propInfo.type === 'object' || (!propInfo.type && propInfo.$ref)) {
        const propMetadata = modelMetadata.find(
          (metadata) =>
            metadata.propertyName === propName &&
            metadata.type === 'customValidation' &&
            metadata.constraints &&
            metadata.constraints.length > 0
        );
        if (propMetadata) {
          propSchema = toDynamooseModelSchema(propMetadata.constraints[0]);
        }
      }
      if (propInfo.type === 'boolean') {
        propType = Boolean;
      }
      modelSchema[propName] = {
        type: propType,
        required: required.includes(propName),
        schema: propSchema,
      };
    });
  }
  const metadatas = dynamooseMetadataStorage.findPropertiesForModel(modelClass);
  metadatas.forEach((metadata) => {
    const propName = String(metadata.name);
    // Remark: for timestamp marked, shouldnt be listed in modelSchema.
    if (metadata.type === 'timestamp') {
      if (modelSchema[propName]) {
        delete modelSchema[propName];
      }
      return;
    }
    if (!modelSchema[propName]) {
      modelSchema[propName] = { type: String, required: true };
    }
    const modelProp = modelSchema[propName];

    if (metadata.options) {
      Object.assign(modelProp, metadata.options);
    }
  });
  return modelSchema;
}
