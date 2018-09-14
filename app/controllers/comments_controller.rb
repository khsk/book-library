class CommentsController < ApplicationController
  def index
    render :json => Comment.all
  end

  def includeBookIndex
    render :json => Comment.includes(:book).to_json(:include => :book)
  end

  def add
    #params = params.require(:data).permit(:book_id, :title, :name, :text, :evaluation)
    comment = params[:data].permit(:book_id, :title, :name, :text, :evaluation)
    logger.debug(comment)
    logger.debug(params)
    logger.debug('---')
    logger.debug(params[:data])
    data = params[:data].to_h
    logger.debug(data)
    render :json => Comment.create(comment)
  end
end

