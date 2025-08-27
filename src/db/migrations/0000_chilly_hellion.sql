CREATE TABLE "flash_images_affiliates" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "flash_images_affiliates_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_uuid" varchar(255) NOT NULL,
	"created_at" timestamp with time zone,
	"status" varchar(50) DEFAULT '' NOT NULL,
	"invited_by" varchar(255) NOT NULL,
	"paid_order_no" varchar(255) DEFAULT '' NOT NULL,
	"paid_amount" integer DEFAULT 0 NOT NULL,
	"reward_percent" integer DEFAULT 0 NOT NULL,
	"reward_amount" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "flash_images_apikeys" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "flash_images_apikeys_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"api_key" varchar(255) NOT NULL,
	"title" varchar(100),
	"user_uuid" varchar(255) NOT NULL,
	"created_at" timestamp with time zone,
	"status" varchar(50),
	CONSTRAINT "flash_images_apikeys_api_key_unique" UNIQUE("api_key")
);
--> statement-breakpoint
CREATE TABLE "flash_images_checkins" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "flash_images_checkins_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_uuid" varchar(255) NOT NULL,
	"checkin_date" varchar(10) NOT NULL,
	"consecutive_days" integer DEFAULT 1 NOT NULL,
	"credits_earned" integer NOT NULL,
	"created_at" timestamp with time zone,
	CONSTRAINT "user_date_unique" UNIQUE("user_uuid","checkin_date")
);
--> statement-breakpoint
CREATE TABLE "flash_images_credits" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "flash_images_credits_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"trans_no" varchar(255) NOT NULL,
	"created_at" timestamp with time zone,
	"user_uuid" varchar(255) NOT NULL,
	"trans_type" varchar(50) NOT NULL,
	"credits" integer NOT NULL,
	"order_no" varchar(255),
	"expired_at" timestamp with time zone,
	CONSTRAINT "flash_images_credits_trans_no_unique" UNIQUE("trans_no")
);
--> statement-breakpoint
CREATE TABLE "flash_images_feedbacks" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "flash_images_feedbacks_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"created_at" timestamp with time zone,
	"status" varchar(50),
	"user_uuid" varchar(255),
	"content" text,
	"rating" integer
);
--> statement-breakpoint
CREATE TABLE "flash_images_images" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "flash_images_images_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"uuid" varchar(255) NOT NULL,
	"user_uuid" varchar(255) NOT NULL,
	"original_image_url" varchar(500),
	"generated_image_url" varchar(500) NOT NULL,
	"style" varchar(50) NOT NULL,
	"ratio" varchar(50),
	"provider" varchar(50) DEFAULT 'replicate' NOT NULL,
	"filename" varchar(255),
	"status" varchar(50) DEFAULT 'completed' NOT NULL,
	"created_at" timestamp with time zone,
	"updated_at" timestamp with time zone,
	CONSTRAINT "flash_images_images_uuid_unique" UNIQUE("uuid")
);
--> statement-breakpoint
CREATE TABLE "flash_images_orders" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "flash_images_orders_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"order_no" varchar(255) NOT NULL,
	"created_at" timestamp with time zone,
	"user_uuid" varchar(255) DEFAULT '' NOT NULL,
	"user_email" varchar(255) DEFAULT '' NOT NULL,
	"amount" integer NOT NULL,
	"interval" varchar(50),
	"expired_at" timestamp with time zone,
	"status" varchar(50) NOT NULL,
	"stripe_session_id" varchar(255),
	"credits" integer NOT NULL,
	"currency" varchar(50),
	"sub_id" varchar(255),
	"sub_interval_count" integer,
	"sub_cycle_anchor" integer,
	"sub_period_end" integer,
	"sub_period_start" integer,
	"sub_times" integer,
	"product_id" varchar(255),
	"product_name" varchar(255),
	"valid_months" integer,
	"order_detail" text,
	"paid_at" timestamp with time zone,
	"paid_email" varchar(255),
	"paid_detail" text,
	CONSTRAINT "flash_images_orders_order_no_unique" UNIQUE("order_no")
);
--> statement-breakpoint
CREATE TABLE "flash_images_posts" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "flash_images_posts_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"uuid" varchar(255) NOT NULL,
	"slug" varchar(255),
	"title" varchar(255),
	"description" text,
	"content" text,
	"created_at" timestamp with time zone,
	"updated_at" timestamp with time zone,
	"status" varchar(50),
	"cover_url" varchar(255),
	"author_name" varchar(255),
	"author_avatar_url" varchar(255),
	"locale" varchar(50),
	CONSTRAINT "flash_images_posts_uuid_unique" UNIQUE("uuid")
);
--> statement-breakpoint
CREATE TABLE "flash_images_users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "flash_images_users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"uuid" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"created_at" timestamp with time zone,
	"nickname" varchar(255),
	"avatar_url" varchar(255),
	"locale" varchar(50),
	"signin_type" varchar(50),
	"signin_ip" varchar(255),
	"signin_provider" varchar(50),
	"signin_openid" varchar(255),
	"invite_code" varchar(255) DEFAULT '' NOT NULL,
	"updated_at" timestamp with time zone,
	"invited_by" varchar(255) DEFAULT '' NOT NULL,
	"is_affiliate" boolean DEFAULT false NOT NULL,
	CONSTRAINT "flash_images_users_uuid_unique" UNIQUE("uuid")
);
--> statement-breakpoint
CREATE UNIQUE INDEX "email_provider_unique_idx" ON "flash_images_users" USING btree ("email","signin_provider");