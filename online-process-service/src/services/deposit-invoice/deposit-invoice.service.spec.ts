import { Test, TestingModule } from '@nestjs/testing';
import { DepositInvoiceService } from './deposit-invoice.service';

describe('DepositInvoiceService', () => {
  let service: DepositInvoiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DepositInvoiceService],
    }).compile();

    service = module.get<DepositInvoiceService>(DepositInvoiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
