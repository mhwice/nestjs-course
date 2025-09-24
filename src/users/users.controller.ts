// Controller Decorator
import { Controller, Patch } from '@nestjs/common';
// HTTP Method Decorators
import { Get, Post } from '@nestjs/common';
// Request Decorators
import { Param, Body, Query } from '@nestjs/common';
// Pipes (validation)
import { ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { PatchUserDto } from './dtos/patch-user.dto';

import { UsersService } from './providers/users.service';

// Swagger
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';


@Controller('users')
@ApiTags("Users")
export class UsersController {

  // Injecting user service
  constructor(private readonly usersService: UsersService) {}

  @Get("{/:id}")
  @ApiOperation({
    summary: "Fetches a list of registed users on the application"
  })
  @ApiResponse({
    status: 200,
    description: "Users fetched successfully based on the query"
  })
  @ApiQuery({
    name: "limit",
    type: "number",
    required: false,
    description: "The number of entries returned per query",
    example: 10
  })
  @ApiQuery({
    name: "page",
    type: "number",
    required: false,
    description: "The position of the page number that you want the API to return",
    example: 1
  })
  public getUsers(
    @Param() getUserParamDto: GetUsersParamDto,
    @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number
  ) {

    return this.usersService.findAll(getUserParamDto, limit, page);
  }

  @Post()
  public createUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto instanceof CreateUserDto);
    return "bye";
  }

  @Patch()
  public patchUser(@Body() patchUserDto: PatchUserDto) {
    return patchUserDto;
  }
}

/*

things to look into:
- decorators
- public, private, protected keywords in class. where did these come from?

We have the following decorators from Nest.
Get, Post, Put, ...
Controller, Module, ...
Param, Query, Body, Headers, Ip, ...


@Param() params: any
console.log(params) { id: "123" }

@Param("id") params: any
console.log(params) "123"

----

It seems to me that class-validator is not actually tied to Nest.
So we might be able to use Zod in its place.


*/

/*

I have just learned that

constructor(private readonly usersService: UsersService) {}

is a shorthand for:

private readonly usersService: UsersService;

constructor(usersService: UsersService) {
  this.usersService = usersService;
}



*/
