using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Refactor : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CartProducts_Carts_CartId",
                table: "CartProducts");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderProducts_Orders_OrderId",
                table: "OrderProducts");

            migrationBuilder.DropTable(
                name: "OpinionActions");

            migrationBuilder.AlterColumn<Guid>(
                name: "OrderId",
                table: "OrderProducts",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AddColumn<DateTime>(
                name: "DeliveredAt",
                table: "OrderDeliveries",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ShippedAt",
                table: "OrderDeliveries",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "OrderDeliveries",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<Guid>(
                name: "CartId",
                table: "CartProducts",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.CreateTable(
                name: "OpinionReactions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    Reaction = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    OpinionId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OpinionReactions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OpinionReactions_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OpinionReactions_ProductOpinions_OpinionId",
                        column: x => x.OpinionId,
                        principalTable: "ProductOpinions",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Carts_Id",
                table: "Carts",
                column: "Id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_OpinionReactions_OpinionId",
                table: "OpinionReactions",
                column: "OpinionId");

            migrationBuilder.CreateIndex(
                name: "IX_OpinionReactions_UserId",
                table: "OpinionReactions",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_CartProducts_Carts_CartId",
                table: "CartProducts",
                column: "CartId",
                principalTable: "Carts",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderProducts_Orders_OrderId",
                table: "OrderProducts",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CartProducts_Carts_CartId",
                table: "CartProducts");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderProducts_Orders_OrderId",
                table: "OrderProducts");

            migrationBuilder.DropTable(
                name: "OpinionReactions");

            migrationBuilder.DropIndex(
                name: "IX_Carts_Id",
                table: "Carts");

            migrationBuilder.DropColumn(
                name: "DeliveredAt",
                table: "OrderDeliveries");

            migrationBuilder.DropColumn(
                name: "ShippedAt",
                table: "OrderDeliveries");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "OrderDeliveries");

            migrationBuilder.AlterColumn<Guid>(
                name: "OrderId",
                table: "OrderProducts",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "CartId",
                table: "CartProducts",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "OpinionActions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ActionType = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    OpinionId = table.Column<Guid>(type: "uuid", nullable: true),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OpinionActions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OpinionActions_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OpinionActions_ProductOpinions_OpinionId",
                        column: x => x.OpinionId,
                        principalTable: "ProductOpinions",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_OpinionActions_OpinionId",
                table: "OpinionActions",
                column: "OpinionId");

            migrationBuilder.CreateIndex(
                name: "IX_OpinionActions_UserId",
                table: "OpinionActions",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_CartProducts_Carts_CartId",
                table: "CartProducts",
                column: "CartId",
                principalTable: "Carts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderProducts_Orders_OrderId",
                table: "OrderProducts",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
