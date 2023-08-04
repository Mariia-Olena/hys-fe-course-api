import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query, Res, UseGuards,
  ValidationPipe
} from "@nestjs/common";
import { OrderService } from "./order.service";
import { Order } from "./schemas/order.schema";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { ListQueryParamsDto } from "../core/dto/list-query-params.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Response } from "express";

@Controller("orders")
export class OrderController {
  constructor(
    private orderService: OrderService
  ) {
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  public async getAll(
    @Query(new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: false
      },
      forbidNonWhitelisted: true
    })) query: ListQueryParamsDto,
    @Res() res: Response
  ): Promise<Response> {
    const { count, items } = await this.orderService.getAll(query || {} as any);

    res.header( 'items-count', count.toString());
    res.json(items);

    return res;
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  public getOne(@Param("id") id: string): Promise<Order> {
    return this.orderService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public create(@Body() body: CreateOrderDto): Promise<Order> {
    return this.orderService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  public remove(@Param("id") id: string): Promise<Order> {
    return this.orderService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id")
  @HttpCode(HttpStatus.OK)
  public update(
    @Param("id") id: string,
    @Body() body: UpdateOrderDto
  ): Promise<Order> {
    return this.orderService.update(id, body);
  }
}
