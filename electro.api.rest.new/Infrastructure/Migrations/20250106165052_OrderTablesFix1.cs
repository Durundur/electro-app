using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class OrderTablesFix1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderDeliveries_Orders_OrderId",
                table: "OrderDeliveries");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderDeliveries_Orders_OrderId1",
                table: "OrderDeliveries");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderPayments_Orders_OrderId",
                table: "OrderPayments");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderPayments_Orders_OrderId1",
                table: "OrderPayments");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderRecipients_Orders_OrderId",
                table: "OrderRecipients");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderRecipients_Orders_OrderId1",
                table: "OrderRecipients");

            migrationBuilder.DropIndex(
                name: "IX_OrderRecipients_OrderId",
                table: "OrderRecipients");

            migrationBuilder.DropIndex(
                name: "IX_OrderRecipients_OrderId1",
                table: "OrderRecipients");

            migrationBuilder.DropIndex(
                name: "IX_OrderPayments_OrderId",
                table: "OrderPayments");

            migrationBuilder.DropIndex(
                name: "IX_OrderPayments_OrderId1",
                table: "OrderPayments");

            migrationBuilder.DropIndex(
                name: "IX_OrderDeliveries_OrderId",
                table: "OrderDeliveries");

            migrationBuilder.DropIndex(
                name: "IX_OrderDeliveries_OrderId1",
                table: "OrderDeliveries");

            migrationBuilder.DropColumn(
                name: "OrderId",
                table: "OrderRecipients");

            migrationBuilder.DropColumn(
                name: "OrderId1",
                table: "OrderRecipients");

            migrationBuilder.DropColumn(
                name: "OrderId",
                table: "OrderPayments");

            migrationBuilder.DropColumn(
                name: "OrderId1",
                table: "OrderPayments");

            migrationBuilder.DropColumn(
                name: "OrderId",
                table: "OrderDeliveries");

            migrationBuilder.DropColumn(
                name: "OrderId1",
                table: "OrderDeliveries");

            migrationBuilder.AddColumn<Guid>(
                name: "DeliveryId",
                table: "Orders",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "PaymentId",
                table: "Orders",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "RecipientId",
                table: "Orders",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Orders_DeliveryId",
                table: "Orders",
                column: "DeliveryId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_PaymentId",
                table: "Orders",
                column: "PaymentId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_RecipientId",
                table: "Orders",
                column: "RecipientId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_OrderDeliveries_DeliveryId",
                table: "Orders",
                column: "DeliveryId",
                principalTable: "OrderDeliveries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_OrderPayments_PaymentId",
                table: "Orders",
                column: "PaymentId",
                principalTable: "OrderPayments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_OrderRecipients_RecipientId",
                table: "Orders",
                column: "RecipientId",
                principalTable: "OrderRecipients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_OrderDeliveries_DeliveryId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_OrderPayments_PaymentId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_OrderRecipients_RecipientId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_DeliveryId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_PaymentId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_RecipientId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "DeliveryId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "PaymentId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "RecipientId",
                table: "Orders");

            migrationBuilder.AddColumn<Guid>(
                name: "OrderId",
                table: "OrderRecipients",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "OrderId1",
                table: "OrderRecipients",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "OrderId",
                table: "OrderPayments",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "OrderId1",
                table: "OrderPayments",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "OrderId",
                table: "OrderDeliveries",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "OrderId1",
                table: "OrderDeliveries",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_OrderRecipients_OrderId",
                table: "OrderRecipients",
                column: "OrderId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_OrderRecipients_OrderId1",
                table: "OrderRecipients",
                column: "OrderId1",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_OrderPayments_OrderId",
                table: "OrderPayments",
                column: "OrderId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_OrderPayments_OrderId1",
                table: "OrderPayments",
                column: "OrderId1",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_OrderDeliveries_OrderId",
                table: "OrderDeliveries",
                column: "OrderId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_OrderDeliveries_OrderId1",
                table: "OrderDeliveries",
                column: "OrderId1",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderDeliveries_Orders_OrderId",
                table: "OrderDeliveries",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderDeliveries_Orders_OrderId1",
                table: "OrderDeliveries",
                column: "OrderId1",
                principalTable: "Orders",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderPayments_Orders_OrderId",
                table: "OrderPayments",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderPayments_Orders_OrderId1",
                table: "OrderPayments",
                column: "OrderId1",
                principalTable: "Orders",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderRecipients_Orders_OrderId",
                table: "OrderRecipients",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderRecipients_Orders_OrderId1",
                table: "OrderRecipients",
                column: "OrderId1",
                principalTable: "Orders",
                principalColumn: "Id");
        }
    }
}
