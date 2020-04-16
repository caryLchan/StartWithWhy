CREATE TABLE "users" (
	"id" serial NOT NULL,
	"username" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "why" (
	"id" serial NOT NULL,
	"why" varchar(255) NOT NULL,
	"userid" integer NOT NULL,
	CONSTRAINT "why_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "how" (
	"id" serial NOT NULL,
	"how" serial(255) NOT NULL,
	"whyid" integer NOT NULL,
	CONSTRAINT "how_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "what" (
	"id" serial NOT NULL,
	"what" varchar(255) NOT NULL,
	"whatid" integer NOT NULL,
	CONSTRAINT "what_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "why" ADD CONSTRAINT "why_fk0" FOREIGN KEY ("userid") REFERENCES "users"("id");

ALTER TABLE "how" ADD CONSTRAINT "how_fk0" FOREIGN KEY ("whyid") REFERENCES "why"("id");

ALTER TABLE "what" ADD CONSTRAINT "what_fk0" FOREIGN KEY ("whatid") REFERENCES "how"("id");
