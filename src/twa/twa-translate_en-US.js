'use strict';

angular.module('ta.bootstrap.twa').config(['$translateProvider',
function($translateProvider) {
	$translateProvider.translations('en-US', {
		TA_TWA_INSERT : "Insert Twemoji Icon",
		TA_TWA_TOOLTIP : 'Insert Twemoji Icon',
		TA_TWA_OK : 'Ok',
		TA_TWA_CANCEL : 'Cancel',

		TA_TWA_SIZE_DEFAULT : 'Default Size',
		TA_TWA_SIZE_LG : '1.3x',
		TA_TWA_SIZE_2X : '2x',
		TA_TWA_SIZE_3X : '3x',
		TA_TWA_SIZE_4X : '4x',
		TA_TWA_SIZE_5X : '5x',

		EMOJI_PEOPLE : 'People',
		EMOJI_PEOPLE_FACES : 'Faces',
		EMOJI_PEOPLE_CAT_FACES : 'Cats',
		EMOJI_PEOPLE_OTHER_FACES : 'Others',
		EMOJI_PEOPLE_MISC : 'Misc',
		EMOJI_PEOPLE_CLOTHES_AND_ACCESSORIES : 'Clothes and Accessories',
		EMOJI_PEOPLE_HEARTS : 'Hearts',

		EMOJI_NATURE : 'Nature',
		EMOJI_NATURE_ANIMALS : 'Animals',
		EMOJI_NATURE_PLANTS_AND_FLOWERS : 'Plants and Flowers',
		EMOJI_NATURE_SCIENCE_AND_WEATHER : 'Scence and Weather',

		EMOJI_OBJECTS : 'Objects',
		EMOJI_OBJECTS_TOYS_TOOLS_AND_TECHNOLOGY : 'Toys, Tools and Technology',
		EMOJI_OBJECTS_BOOKS_ENVELOPES_AND_STATIONERY : 'Books, Envelopes and Stationery',
		EMOJI_OBJECTS_MUSIC_AND_ARTS : 'Music and Arts',
		EMOJI_OBJECTS_SPORTS_AND_GAMES : 'Sports and Games',
		EMOJI_OBJECTS_FOOD_AND_DRINK : 'Food and Drink',
		EMOJI_OBJECTS_FRUIT_AND_VEGETABLES : 'Fruit and Vegetables',

		EMOJI_PLACES : 'Places',
		EMOJI_PLACES_BUILDINGS_LOCATIONS_AND_LANDMARKS : 'Buildings, Locations and Landmarks',
		EMOJI_PLACES_TRANSPORT : 'Transport',
		EMOJI_PLACES_FLAGS : 'Flags',

		EMOJI_SYMBOLS : 'Symbols',
		EMOJI_SYMBOLS_NUMBERS_AND_ARROWS : 'Numbers and Arrows',
		EMOJI_SYMBOLS_TEXT_AND_LABELS : 'Text and Labels',
		EMOJI_SYMBOLS_ASTROLOGICAL_ZODIAC_SIGNS : 'Astrological, Zodiac and Signs',
		EMOJI_SYMBOLS_OTHER_SYMBOLS_AND_CHARACTERS : 'Others and Characters'
	});
}]);