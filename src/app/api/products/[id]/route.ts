import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Path to your Prisma client setup

// GET: Fetch a single product by ID
export async function GET(_: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
  const { id } = params;

  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });

    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Error fetching product', error: error.message }, { status: 500 });
  }
}

// PUT: Update a product by ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
  const { id } = params;
  const body = await req.json();
  const { name, description, price }: { name?: string; description?: string; price?: number } = body;

  try {
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
        price: price !== undefined ? parseFloat(price.toString()) : undefined,
      },
    });

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Error updating product', error: error.message }, { status: 500 });
  }
}

// DELETE: Delete a product by ID
export async function DELETE(_: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
  const { id } = params;

  try {
    const deletedProduct = await prisma.product.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: 'Product deleted', deletedProduct }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Error deleting product', error: error.message }, { status: 500 });
  }
}
