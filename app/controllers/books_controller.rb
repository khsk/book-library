class BooksController < ApplicationController
  def index
    @books = Book.all
  end
  def list
    render :json => Book.all
  end

  def search
    render :json => Book.where('title like "%' + params[:keyword] + '%"')
  end

  def pending
    render :json => Book.where('status = "' + params[:status] + '"')
  end

  def comments
    render :json => Comment.where('book_id = ' + params[:book_id])
  end

  def addRequest
    #params = params.require(:data).permit(:book_id, :title, :name, :text, :evaluation)
    book = params[:data].permit(:purchaser, :title, :author, :published_date, :base, :isbn, :status)
    logger.debug(book)
    logger.debug(params)
    logger.debug('---')
    logger.debug(params[:data])
    data = params[:data].to_h
    logger.debug(data)
    render :json => Book.create(book)
  end

  def changeStatus
      book = params[:data].permit(:id, :status)
      render :json => Book.find_by(id: book[:id]).update(status:book[:status])
  end

end

