const { formatResponse } = require('../utils/formatting/formatting.utils');
const BookService = require('../services/book.service');

const createBook = async (req, res) => {
  // #swagger.tags = ['Books']
  /*
    #swagger.parameters['authorization'] = {
      in: 'header',
      type: 'string',
      required: true,
      description: 'Authorization token'
    }
    #swagger.parameters['obj'] = {
      in: 'body',
      type: 'object',
      required: true,
      description: 'Add new book',
      schema: {
          $title: 'string',
          $author: 'string',
          $publisher: 'string',
          $category: 'string',
          $description: 'string',
          $price: 0,
          $rating: 0,  
          $stock: 0,
          $tags: ['string'],
          $weight: 0,
          $dimensions: {
              length: 0,
              width: 0,
              height: 0
          },
          $images: ['string'],
          $discountPercentage: 10,
          $reviews: [
              {
                  userId: 'string',
                  rating: 0,
                  comment: 'string',
                  date: '2023-10-01T00:00:00Z'
              }
          ],
          $thumbnail: 'string',
          $availabilityStatus: 'string',
          $returnPolicy: 'string',
          $shippingInformation: 'string',
          $shippingCost: 10,
          $minimumOrderQuantity: 0
      }
    }
  */

  const payload = req.body;
  try {
    const book = await BookService.create(payload);
    return formatResponse(res, book)
  } catch (error) {
    return formatResponse(res, error)
  }
}

const getAllBooks = async (req, res) => {
  // #swagger.tags = ['Books']
  // #swagger.summary = "Get All Books"
  /*
    #swagger.parameters['title'] = {
      in: 'query',
      type: 'string',
      required: false,
      description: 'Book title'
    }
    #swagger.parameters['category'] = {
      in: 'query',
      type: 'string',
      required: false,
      description: 'Book category'
    }
      #swagger.parameters['author'] = {
      in: 'query',
      type: 'string',
      required: false,
      description: 'Book author'
    }
    #swagger.parameters['limit'] = {
      in: 'query',
      type: 'string',
      required: false,
      description: 'Number of items per page'
    }
    #swagger.parameters['page'] = {
      in: 'query',
      type: 'string',
      required: false,
      description: 'Page number'
    }
    #swagger.parameters['order_by'] = {
      in: 'query',
      type: 'string',
      required: false,
      description: 'Default: updatedAt'
    }
    #swagger.parameters['order_direction'] = {
      in: 'query',
      type: 'string',
      required: false,
      description: 'Possible values: [ASC, DESC]'
    }
  */
  try {
    const books = await BookService.getAll(req.query);
    return formatResponse(res, books);
  } catch (error) {
    return formatResponse(res, error);
  }
};

const getBookById = async (req, res) => {
  // #swagger.tags = ['Books']
  /*
  #swagger.parameters['id'] = { 
    in: 'path', 
    description: 'Book ID', 
    required: true ,
    description: 'Book Id'
  }
 */
  try {
    const book = await BookService.getById(req.params.id);
    return formatResponse(res, book);
  } catch (error) {
    return formatResponse(res, error);
  }
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById
}