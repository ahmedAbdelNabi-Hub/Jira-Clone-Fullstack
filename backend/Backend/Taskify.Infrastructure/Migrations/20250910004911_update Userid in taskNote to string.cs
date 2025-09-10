using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Taskify.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class updateUseridintaskNotetostring : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TaskNote_Tasks_TaskItemId",
                table: "TaskNote");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TaskNote",
                table: "TaskNote");

            migrationBuilder.RenameTable(
                name: "TaskNote",
                newName: "TaskNotes");

            migrationBuilder.RenameIndex(
                name: "IX_TaskNote_TaskItemId",
                table: "TaskNotes",
                newName: "IX_TaskNotes_TaskItemId");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "TaskNotes",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TaskNotes",
                table: "TaskNotes",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TaskNotes_Tasks_TaskItemId",
                table: "TaskNotes",
                column: "TaskItemId",
                principalTable: "Tasks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TaskNotes_Tasks_TaskItemId",
                table: "TaskNotes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TaskNotes",
                table: "TaskNotes");

            migrationBuilder.RenameTable(
                name: "TaskNotes",
                newName: "TaskNote");

            migrationBuilder.RenameIndex(
                name: "IX_TaskNotes_TaskItemId",
                table: "TaskNote",
                newName: "IX_TaskNote_TaskItemId");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "TaskNote",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TaskNote",
                table: "TaskNote",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TaskNote_Tasks_TaskItemId",
                table: "TaskNote",
                column: "TaskItemId",
                principalTable: "Tasks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
