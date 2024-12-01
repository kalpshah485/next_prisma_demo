import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Path to your Prisma client setup

// GET: Fetch all products
export async function GET(): Promise<NextResponse> {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Error fetching products', error: error.message }, { status: 500 });
  }
}

// POST: Create a new product
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { name, description, price }: { name: string; description?: string; price: number } = body;

    if (!name || price === undefined) {
      return NextResponse.json({ message: 'Name and price are required' }, { status: 400 });
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price.toString()),
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Error creating product', error: error.message }, { status: 500 });
  }
}
