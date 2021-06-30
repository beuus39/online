import { Test, TestingModule } from '@nestjs/testing';
import { DepositInvoiceController } from './deposit-invoice.controller';

describe('DepositInvoiceController', () => {
  let controller: DepositInvoiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepositInvoiceController],
    }).compile();

    controller = module.get<DepositInvoiceController>(DepositInvoiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
