import { DynamicModule, Module } from '@nestjs/common'

import {
	ProviderOptionsSymbol,
	TypeAsyncOptions,
	TypeOptions
} from './provider.constants'
import { ProviderService } from './provider.service'

@Module({})
export class ProviderModule {
	public static register(options: TypeOptions): DynamicModule {
		return {
			module: ProviderModule,
			providers: [
				{
					provide: ProviderOptionsSymbol,
					useValue: options.services
				},
				ProviderService
			],
			exports: [ProviderService]
		}
	}

	public static registerAsync(options: TypeAsyncOptions): DynamicModule {
		return {
			module: ProviderModule,
			imports: options.imports,
			providers: [
				{
					provide: ProviderOptionsSymbol,
					useFactory: options.useFactory,
					inject: options.inject
				},
				ProviderService
			],
			exports: [ProviderService]
		}
	}
}
