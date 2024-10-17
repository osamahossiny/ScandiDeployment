DROP DATABASE IF EXISTS task;
CREATE DATABASE task;


USE task;

CREATE TABLE category (
    name VARCHAR(255),
    PRIMARY key (name)
);

CREATE TABLE product (
    id VARCHAR(255),
    name VARCHAR(255) NOT NULL,
    inStock BOOLEAN DEFAULT TRUE,
    -- gallary
    description TEXT,
    category VARCHAR(255),
    brand VARCHAR(255),
    FOREIGN KEY(category) REFERENCES category (name) ON DELETE SET NULL,
    PRIMARY KEY (id)
);

CREATE TABLE product_gallary (
    link TEXT NOT NULL,
    product_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE CASCADE,
    PRIMARY KEY (product_id, link(255))
);

CREATE TABLE attribute (
    id VARCHAR(255),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE product_attribute (
    id VARCHAR(255) NOT NULL,
    product_id VARCHAR(255),
    attribute_id VARCHAR(255),
    display_value VARCHAR(255) NOT NULL,
    value VARCHAR(255) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE CASCADE,
    FOREIGN KEY (attribute_id) REFERENCES attribute (id) ON DELETE CASCADE,
    PRIMARY KEY (product_id, attribute_id, value)
);

CREATE TABLE currency (
    label VARCHAR(255),
    symbol VARCHAR(10),
    PRIMARY KEY (label)
);

CREATE TABLE price (
    product_id VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2),
    currency VARCHAR(255) NOT NULL,
    id INT NOT NULL AUTO_INCREMENT, -- added so that a product can have more than one price 
                                    -- with the same currency in case of multible sellers
    FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE,
    FOREIGN KEY (currency) REFERENCES currency(label) ON DELETE CASCADE,
    PRIMARY KEY (id)
);

CREATE TABLE `order` (
    id INT NOT NULL AUTO_INCREMENT,
    total DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(255) NOT NULL,
    order_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'pending',
    PRIMARY KEY (id)
);
CREATE TABLE order_product (
    id INT AUTO_INCREMENT,
    order_id INT,
    product_id VARCHAR(255),
    amount INT DEFAULT 1,
    total DECIMAL(10, 2),
    currency VARCHAR(255) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES `order` (id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE CASCADE,
    PRIMARY KEY (id)
);
CREATE TABLE order_product_attribute (
    order_product_id INT,
    attribute_id VARCHAR(255),
    display_value VARCHAR(255) NOT NULL,
    value VARCHAR(255) NOT NULL,
    FOREIGN KEY (order_product_id) REFERENCES order_product (id) ON DELETE CASCADE,
    FOREIGN KEY (attribute_id) REFERENCES attribute (id) ON DELETE CASCADE,
    PRIMARY KEY (order_product_id, attribute_id)
);
