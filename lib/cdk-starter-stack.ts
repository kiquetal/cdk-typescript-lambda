import * as lambda from '@aws-cdk/aws-lambda';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import {NodejsFunction} from '@aws-cdk/aws-lambda-nodejs';
import * as cdk from '@aws-cdk/core';
import * as path from 'path';
import * as iam from '@aws-cdk/aws-iam';

export class CdkStarterStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const myFunction = new NodejsFunction(this, 'data-mgm-function-queries', {
      memorySize: 768,
      timeout: cdk.Duration.seconds(5),
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'main',
      entry: path.join(__dirname, `/../src/my-lambda/index.ts`),
      bundling: {
        minify: true,
        externalModules: ['aws-sdk'],
      },
    });

    myFunction.role?.addManagedPolicy(
        iam.ManagedPolicy.fromAwsManagedPolicyName(
            'service-role/AWSLambdaBasicExecutionRole',
        ),
    );




  }
}
