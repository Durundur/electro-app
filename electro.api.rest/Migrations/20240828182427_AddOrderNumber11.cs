using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace electro.api.rest.Migrations
{
    /// <inheritdoc />
    public partial class AddOrderNumber11 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "schared");

            migrationBuilder.CreateSequence<int>(
                name: "ORDER_NUMBER",
                schema: "schared",
                startValue: 2361L);

            migrationBuilder.AddColumn<int>(
                name: "Number",
                table: "Orders",
                type: "integer",
                nullable: false,
                defaultValueSql: "nextval('schared.\"ORDER_NUMBER\"')");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Number",
                table: "Orders");

            migrationBuilder.DropSequence(
                name: "ORDER_NUMBER",
                schema: "schared");
        }
    }
}
