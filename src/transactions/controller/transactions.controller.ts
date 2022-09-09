import { Controller, Post, Body } from '@nestjs/common';
import { TransactionDto } from '../dto/transaction.dto';
import { Transaction } from '../entity/transactions.entity';
import { TransactionsService } from '../service/transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Post()
  async createTransactions(@Body() transaction: TransactionDto): Promise<Transaction> {
    return await this.transactionsService.create(transaction);
  }
}
