import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import { ServiceAccount } from 'firebase-admin';
import { CommonAuthConfig } from '../types';

export class AuthConfig {
  static async getServiceAccount(): Promise<ServiceAccount> {
    const client = new SecretManagerServiceClient();

    const [versionData] = await client.accessSecretVersion({
      name: `projects/opendata-units/secrets/firebase-secrets/versions/latest`,
    });

    const secret = versionData.payload?.data?.toString() || '';
    const credentials = JSON.parse(secret);

    return {
      projectId: credentials.project_id,
      clientEmail: credentials.client_email,
      privateKey: credentials.private_key,
    };
  }

  static get commonConfig(): CommonAuthConfig {
    return {
      isAuthEnabled: process.env.IS_AUTH_ENABLED || 'false',
      devUserId: process.env.DEV_USER_ID || '',
    };
  }
}

export const isAuthEnabled = (): boolean =>
  AuthConfig.commonConfig.isAuthEnabled === 'true';
