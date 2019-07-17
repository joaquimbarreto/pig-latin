class TranslationsController < ApplicationController
    
    def index
        @translations = Translation.all
    end

    def create
        @translation = Translation.create(translation_params)
        redirect_to translation_path(@translation)
    end

    def destroy
        @translation = Translation.find(params[:id])
        @translation.destroy(translation_params)
        redirect_to translation_path(@translation)
    end

    private

    def translation_params
        params.require(:translation).permit(:input, :pig_latin)        
    end
    
end
