drop table if exists public.order_item;
drop table if exists public.order;
drop table if exists public.coupon;
drop table if exists public.item;

create table public.item (
	id_item serial primary key,
	description text,
	price numeric,
	width integer,
	height integer,
	length integer,
	weight integer
);

insert into public.item (description, price, width, height, length, weight) values ('Guitarra', 1000, 100, 30, 10, 3);
insert into public.item (description, price, width, height, length, weight) values ('Amplificador', 5000, 50, 50, 50, 20);
insert into public.item (description, price, width, height, length, weight) values ('Cabo', 30, 10, 10, 10, 1);

create table public.coupon (
	code text,
	percentage numeric,
	expire_date timestamp,
	primary key (code)
);

insert into public.coupon (code, percentage, expire_date) values ('VALE20', 20, '2022-10-10T10:00:00');
insert into public.coupon (code, percentage, expire_date) values ('VALE20_EXPIRED', 20, '2020-10-10T10:00:00');

create table public.order (
	id_order serial,
	coupon_code text,
	coupon_percentage numeric,
	code text,
	cpf text,
	issue_date timestamp,
	freight numeric,
	sequence integer,
	total numeric,
	primary key (id_order)
);

create table public.order_item (
	id_order integer references public.order (id_order),
	id_item integer references public.item (id_item),
	price numeric,
	quantity integer,
	primary key (id_order, id_item)
);