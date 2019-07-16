Rails.application.routes.draw do
  resources :translations, except: [:destroy, :create]
  delete 'delete_translation', to: 'translations#destroy'
  post 'create_translation', to: 'translations#create'
end
