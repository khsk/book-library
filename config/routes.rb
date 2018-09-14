Rails.application.routes.draw do
  get 'top/index'
  get 'books/list'
  get 'books/search'
  get 'books/pending'
  get 'books/comments'
  post 'books/addRequest'
  post 'books/changeStatus'
  get 'comments/index'
  get 'comments/includeBookIndex'
  post 'comments/add'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
