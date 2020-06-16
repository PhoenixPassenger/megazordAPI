import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddForeignKeyWords1592224959690
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'words',
      new TableColumn({
        name: 'rhyme_id',
        type: 'uuid',
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKey(
      'words',
      new TableForeignKey({
        name: 'RhymesWith',
        columnNames: ['rhyme_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'rhymes',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('words', 'RhymesWith');

    await queryRunner.dropColumn('words', 'rhyme_id');
  }
}
