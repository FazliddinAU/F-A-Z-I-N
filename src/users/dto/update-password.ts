import { ApiProperty } from "@nestjs/swagger";

export class UpdatePasswordDto{
    @ApiProperty({example : "Eski parol"})
    oldPassword : string

    @ApiProperty({example : "Yangi parol"})
    newPassword : string
}