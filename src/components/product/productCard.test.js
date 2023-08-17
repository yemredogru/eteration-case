import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductCard from './productCard'; 


const mockProducts = {
  current: [
    {"createdAt":"2023-07-17T07:21:02.529Z","name":"Bentley Focus","image":"https://loremflickr.com/640/480/food","price":"51.00","description":"Quasi adipisci sint veniam delectus. Illum laboriosam minima dignissimos natus earum facere consequuntur eius vero. Itaque facilis at tempore ipsa. Accusamus nihil fugit velit possimus expedita error porro aliquid. Optio magni mollitia veritatis repudiandae tenetur nemo. Id consectetur fuga ipsam quidem voluptatibus sed magni dolore.\nFacilis commodi dolores sapiente delectus nihil ex a perferendis. Totam deserunt assumenda inventore. Incidunt nesciunt adipisci natus porro deleniti nisi incidunt laudantium soluta. Nostrum optio ab facilis quisquam.\nSoluta laudantium ipsa ut accusantium possimus rem. Illo voluptatibus culpa incidunt repudiandae placeat animi. Delectus id in animi incidunt autem. Ipsum provident beatae nisi cumque nulla iure.","model":"CTS","brand":"Lamborghini","id":"1"},{"createdAt":"2023-07-17T02:49:46.692Z","name":"Aston Martin Durango","image":"https://loremflickr.com/640/480/food","price":"374.00","description":"Odio et voluptates velit omnis incidunt dolor. Illo sint quisquam tenetur dolore nemo molestiae. Dolorum odio dicta placeat. Commodi rerum molestias quibusdam labore. Odio libero doloribus. Architecto repellendus aperiam nulla at at voluptatibus ipsum.\nFugit expedita a quo totam quaerat amet eveniet laboriosam. Ad assumenda atque porro neque iusto. Inventore repudiandae esse non sit veritatis ab reprehenderit quas. Sit qui natus exercitationem quis commodi vero.\nIure reiciendis quas corrupti incidunt repellat voluptatem esse eveniet. Aliquid illo cum doloremque similique. Blanditiis corporis repellendus cumque totam quod iusto dolorum. Incidunt a eos eum voluptas tempora voluptas reiciendis autem.","model":"Roadster","brand":"Smart","id":"2"}
  ],
};
const mockSetItem = jest.fn();
const mockUpdateProducts = jest.fn();

describe('ProductCard', () => {
  it('renders product cards and pagination', () => {
    render(
      <ProductCard
        products={mockProducts}
        setItem={mockSetItem}
        updateProducts={mockUpdateProducts}
      />
    );


    const productCards = screen.getAllByTestId('product-card');
    expect(productCards).toHaveLength(mockProducts.current.length);


    userEvent.click(screen.getByRole('button', { name: /Add to Cart/i }));
    expect(mockSetItem).toHaveBeenCalledTimes(1);
  });
});
