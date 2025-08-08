// import { DataSource, Entity, PrimaryGeneratedColumn, Column, Repository } from "typeorm";

// @Entity()
// export class Token {
//   @PrimaryGeneratedColumn()
//   id!: number;

//   @Column() teamId!: string;
//   @Column() accessToken!: string;
//   @Column() refreshToken!: string;
//   @Column({ nullable: true }) expiresAt!: string;
// }

// @Entity()
// export class ScheduledMessage {
//   @PrimaryGeneratedColumn()
//   id!: number;

//   @Column() teamId!: string;
//   @Column() channelId!: string;
//   @Column() text!: string;
//   @Column() postAt!: number;
//   @Column() status!: string;
// }

// export const AppDataSource = new DataSource({
//   type: "sqlite",
//   database: "db.sqlite",
//   synchronize: true,
//   logging: false,
//   entities: [Token, ScheduledMessage],
// });

// export const initDB = async () => await AppDataSource.initialize();

// export const tokenRepo = (): Repository<Token> => AppDataSource.getRepository(Token);
// export const scheduleRepo = (): Repository<ScheduledMessage> => AppDataSource.getRepository(ScheduledMessage);

// export async function saveTokens(teamId: string, access: string, refresh: string) {
//   const repo = tokenRepo();
//   const token = repo.create({ teamId, accessToken: access, refreshToken: refresh, expiresAt: "" });
//   await repo.save(token);
// }




// src/db.ts
import { DataSource, Entity, PrimaryGeneratedColumn, Column, Repository } from "typeorm";

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column() teamId!: string;

  @Column() accessToken!: string;

  @Column({ nullable: true }) refreshToken!: string;


  @Column({ nullable: true }) expiresAt!: string; // optional expiry
}

@Entity()
export class ScheduledMessage {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column() teamId!: string;

  @Column() channelId!: string;

  @Column() text!: string;

  @Column() postAt!: number; // epoch timestamp for scheduling

  @Column() status!: string; // e.g. "pending", "sent", etc.
}

// Main DB connection
export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "db.sqlite",
  synchronize: true,
  logging: false,
  entities: [Token, ScheduledMessage],
});

// Call this before using any repo
export const initDB = async () => {
  await AppDataSource.initialize();
  console.log("✅ SQLite DB Initialized");
};

// Repositories
export const tokenRepo = (): Repository<Token> => AppDataSource.getRepository(Token);
export const scheduleRepo = (): Repository<ScheduledMessage> => AppDataSource.getRepository(ScheduledMessage);

// Save or update token for a team
export async function saveTokens(teamId: string, access: string, refresh: string, expiresAt: string = "") {
  const repo = tokenRepo();
  const existing = await repo.findOneBy({ teamId });

  if (existing) {
    existing.accessToken = access;
    existing.refreshToken = refresh;
    existing.expiresAt = expiresAt;
    await repo.save(existing);
    console.log(`🔁 Updated token for team ${teamId}`);
  } else {
    const token = repo.create({ teamId, accessToken: access, refreshToken: refresh, expiresAt });
    await repo.save(token);
    console.log(`✅ Saved new token for team ${teamId}`);
  }
}
