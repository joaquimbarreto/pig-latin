class TranslationsController < ApplicationController
    
    def index
        @translations = Translation.all
    end

    def create
        @translation = Translation.new(translation_params)
    end

    def destroy
        @translation.destroy
    end

    private

    def translation_params
        params.require(:translation).permit(:input, :pig_latin)        
    end
    
end
