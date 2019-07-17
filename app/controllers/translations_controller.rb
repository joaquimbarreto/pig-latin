class TranslationsController < ApplicationController
    
    def index
        @translations = Translation.all
        render json: @translations
    end

    def create
        @translation = Translation.create(translation_params)
        if @translation.save
            render json: @translation
        else
            render json: {error: "Unable to create translation."}, status: 400
        end
        redirect_to translations_path
    end

    def destroy
        @translation = Translation.find(params[:id])
        @translation.destroy
        redirect_to translations_path
    end

    private

    def translation_params
        params.require(:translation).permit(:input, :pig_latin)        
    end
    
end
