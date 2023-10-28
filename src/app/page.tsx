import { IProductParams, getProducts } from "@/actions/getProducts";
import Container from "@/components/Container";
import HomeBanner from "@/components/nav/HomeBanner";
import ProductCard from "@/components/products/ProductCard";
import { Product } from "@prisma/client";

interface HomeProps {
  searchParams: IProductParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const products = await getProducts(searchParams);

  const shuffeArray = (array: any) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const shuffedProducts = shuffeArray(products);
  return (
    <div className="p-8">
      <Container>
        <div>
          <HomeBanner />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {/* <Products /> */}
          {shuffedProducts && shuffedProducts.length > 0 ? (
            shuffedProducts.map((product: Product) => (
              <ProductCard key={product.id} data={product} />
            ))
          ) : (
            <p className="text-center justify-items-center">
              No products found
            </p>
          )}
        </div>
      </Container>
    </div>
  );
}
