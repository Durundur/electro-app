using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Recipient2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "FirstName",
                table: "Recipients",
                newName: "Firstname");

            migrationBuilder.RenameColumn(
                name: "SureName",
                table: "Recipients",
                newName: "Surname");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Firstname",
                table: "Recipients",
                newName: "FirstName");

            migrationBuilder.RenameColumn(
                name: "Surname",
                table: "Recipients",
                newName: "SureName");
        }
    }
}
