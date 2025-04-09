import { CarrierClient } from '../../types/tracking';
import { YamatoClient } from './yamato';
import { SagawaClient } from './sagawa';

export class CarrierClientFactory {
  static createClient(carrier: string): CarrierClient {
    switch (carrier.toLowerCase()) {
      case 'yamato':
        return new YamatoClient();
      case 'sagawa':
        return new SagawaClient();
      default:
        throw new Error(`Unsupported carrier: ${carrier}`);
    }
  }
} 
import { YamatoClient } from './yamato';
import { SagawaClient } from './sagawa';

export class CarrierClientFactory {
  static createClient(carrier: string): CarrierClient {
    switch (carrier.toLowerCase()) {
      case 'yamato':
        return new YamatoClient();
      case 'sagawa':
        return new SagawaClient();
      default:
        throw new Error(`Unsupported carrier: ${carrier}`);
    }
  }
} 
import { YamatoClient } from './yamato';
import { SagawaClient } from './sagawa';

export class CarrierClientFactory {
  static createClient(carrier: string): CarrierClient {
    switch (carrier.toLowerCase()) {
      case 'yamato':
        return new YamatoClient();
      case 'sagawa':
        return new SagawaClient();
      default:
        throw new Error(`Unsupported carrier: ${carrier}`);
    }
  }
} 
import { YamatoClient } from './yamato';
import { SagawaClient } from './sagawa';

export class CarrierClientFactory {
  static createClient(carrier: string): CarrierClient {
    switch (carrier.toLowerCase()) {
      case 'yamato':
        return new YamatoClient();
      case 'sagawa':
        return new SagawaClient();
      default:
        throw new Error(`Unsupported carrier: ${carrier}`);
    }
  }
} 