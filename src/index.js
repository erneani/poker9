var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var cardsDiv = document.querySelector("#pokemonCardsContainer");
var populatePokemonCards = function () { return __awaiter(_this, void 0, void 0, function () {
    var pokemonCards, i, pokemon;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                pokemonCards = "";
                i = 1;
                _a.label = 1;
            case 1:
                if (!(i <= 153)) return [3 /*break*/, 4];
                return [4 /*yield*/, getPokemon(i)];
            case 2:
                pokemon = _a.sent();
                pokemonCards += createPokemonCard(pokemon);
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4:
                if (cardsDiv) {
                    cardsDiv.innerHTML = pokemonCards;
                }
                return [2 /*return*/];
        }
    });
}); };
var createPokemonCard = function (pokemonInfo) {
    var mainType = pokemonInfo.types[pokemonInfo.types.length - 1];
    var pokemonName = "" + pokemonInfo.name
        .charAt(0)
        .toUpperCase() + pokemonInfo.name.slice(1);
    var pokemonHTML = "\n    <div class=\"pokemon-card\" id=\"" + pokemonName + "\">\n      <div class=\"pokemon-card__image-wrapper type--" + mainType + "\">\n        <div class=\"pokemon-card__image\">\n          <img\n            src=\"" + pokemonInfo.image + "\"\n            alt=\"" + pokemonName + " image\"\n          />\n        </div>\n      </div>\n      <div class=\"pokemon-card__content\">\n        <div class=\"pokemon-card__number\">\n          #" + pokemonInfo.number.toString().padStart(3, "0") + "\n        </div>\n        <div class=\"pokemon-card__name\">\n          " + pokemonName + "\n        </div>\n        <span class=\"pokemon-card__tag type--" + mainType + "\">\n          " + pokemonInfo.types[pokemonInfo.types.length - 1] + "\n        </span>\n      </div>\n    </div>\n  ";
    return pokemonHTML;
};
var getPokemon = function (pokemonId) { return __awaiter(_this, void 0, void 0, function () {
    var pokemonList, pokemonListJson;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonId)];
            case 1:
                pokemonList = _a.sent();
                return [4 /*yield*/, pokemonList.json()];
            case 2:
                pokemonListJson = _a.sent();
                return [2 /*return*/, createPokemon(pokemonListJson)];
        }
    });
}); };
var createPokemon = function (pokemonJson) {
    var stats = pokemonJson.stats.map(function (stat) {
        var _a;
        return _a = {}, _a[stat.stat.name] = stat.base_stat, _a;
    });
    var types = pokemonJson.types.map(function (pokemonType) {
        return pokemonType.type.name;
    });
    return {
        number: pokemonJson.id,
        name: pokemonJson.name,
        height: pokemonJson.height,
        weight: pokemonJson.weight,
        image: pokemonJson.sprites.front_default,
        types: types,
        stats: stats
    };
};
populatePokemonCards();
