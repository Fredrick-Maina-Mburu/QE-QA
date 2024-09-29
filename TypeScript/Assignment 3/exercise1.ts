// OBJECTS

// Extending Objects

// Exercise 1: Create an Intersection Type

type User = {
  name: string;
  email: string;
} & BaseEntity;

type Product = {
  name: string;
  price: number;
} & BaseEntity;

type BaseEntity = {
  id: string;
  createdAt: Date;
}

// Exercise 2: Extending Interfaces

interface User1 extends BaseEntity{
  name: string;
  email: string;
}

interface Product1 extends BaseEntity{
  name: string;
  price: number;
}

interface BaseEntity1 {
  id: string;
  createdAt: Date;
}