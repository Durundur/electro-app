using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace electro.api.rest.Migrations
{
    /// <inheritdoc />
    public partial class PhotosColumnChangeToString : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string[]>(
                name: "Photos",
                table: "Products",
                type: "text[]",
                nullable: false,
                oldClrType: typeof(List<byte[]>),
                oldType: "bytea[]");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<List<byte[]>>(
                name: "Photos",
                table: "Products",
                type: "bytea[]",
                nullable: false,
                oldClrType: typeof(string[]),
                oldType: "text[]");
        }
    }
}
