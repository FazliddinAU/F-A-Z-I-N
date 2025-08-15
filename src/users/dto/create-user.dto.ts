import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ example : "Ali" })
    @IsString()
    name : string

    @ApiProperty({ example : "ali73@gmail.com"})
    @IsString()
    email : string
    
    @ApiProperty({ example : "ali8234"})
    @IsString()
    password : string
}
