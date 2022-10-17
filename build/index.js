/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
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
}

var System = /** @class */ (function () {
    function System() {
    }
    return System;
}());

var Vec2 = /** @class */ (function () {
    function Vec2(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    Vec2.prototype.add = function (v) {
        return new Vec2(this.x + v.x, this.y + v.y);
    };
    Vec2.prototype.opposite = function () {
        return new Vec2(-this.x, -this.y);
    };
    Object.defineProperty(Vec2.prototype, "magnitude", {
        get: function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        },
        enumerable: false,
        configurable: true
    });
    Vec2.prototype.multiplyScalar = function (scalar) {
        return new Vec2(this.x * scalar, this.y * scalar);
    };
    Vec2.prototype.dotProduct = function (v) {
        return this.x * v.x + this.y * v.y;
    };
    Vec2.prototype.clone = function () {
        return new Vec2(this.x, this.y);
    };
    return Vec2;
}());

var Entity = /** @class */ (function () {
    function Entity(name) {
        //Ent props
        this.name = "";
        this.tags = new Set();
        // Transform
        this.transform = new Vec2();
        this._components = new Map();
        this._children = [];
        this.parent = undefined;
        this._eventListeners = [];
        this.name = name;
    }
    Object.defineProperty(Entity.prototype, "absoluteTransform", {
        get: function () {
            var ftran = this.transform.clone();
            var p = this.parent;
            while (p) {
                ftran = ftran.add(p.transform);
                p = p.parent;
            }
            return ftran;
        },
        enumerable: false,
        configurable: true
    });
    Entity.prototype.deleteSelf = function () {
        this.addTag("toBedeleTed123");
    };
    Entity.prototype.addComponent = function (c) {
        this._components.set(c.type, c);
        c.entity = this;
    };
    Entity.prototype.getComponent = function (type) {
        return this._components.get(type);
    };
    Entity.prototype.getComponentsByBasicType = function (type) {
        var arr = [];
        this._components.forEach(function (c) {
            if (c.basicType === type) {
                arr.push(c);
            }
        });
        return arr;
    };
    Entity.prototype.deleteComponent = function (type) {
        var comp = this._components.get(type);
        if (comp) {
            for (var prop in comp) {
                if (comp.hasOwnProperty(prop)) {
                    delete comp[prop];
                }
            }
            this._components.delete(type);
        }
    };
    Entity.prototype.hasComponent = function (type) {
        return this._components.has(type);
    };
    Entity.prototype.addTag = function (tag) {
        this.tags.add(tag);
    };
    Entity.prototype.removeTag = function (tag) {
        this.tags.delete(tag);
    };
    Entity.prototype.hasTag = function (tag) {
        return this.tags.has(tag);
    };
    Entity.prototype.addChild = function (e) {
        if (e.parent) {
            throw new Error("Entity is a child of other entity! " + e);
        }
        e.parent = this;
        this._children.push(e);
    };
    Entity.prototype.removeChild = function (name) {
        var co = this.getChild(name);
        if (co)
            co.parent = undefined;
        this._children = this._children.filter(function (c) { return c.name !== name; });
    };
    Entity.prototype.hasChild = function (name) {
        return this._children.findIndex(function (c) { return c.name === name; }) !== -1;
    };
    Entity.prototype.getChild = function (name) {
        return this._children.find(function (c) { return c.name === name; });
    };
    Entity.prototype.removeAllChildren = function () {
        for (var i = 0; i < this._children.length; i++) {
            this.removeChild(this._children[i].name);
        }
    };
    Object.defineProperty(Entity.prototype, "children", {
        get: function () {
            return this._children;
        },
        enumerable: false,
        configurable: true
    });
    Entity.prototype.setParent = function (parent) {
        if (parent) {
            parent.addChild(this);
        }
        this.parent = parent;
    };
    Entity.prototype.triggerEvent = function (name, payload) {
        for (var i = 0; i < this._eventListeners.length; i++) {
            this._eventListeners[i](name, payload);
        }
    };
    Entity.prototype.addEventListener = function (listener) {
        this._eventListeners.push(listener);
    };
    return Entity;
}());

var EntityManager = /** @class */ (function (_super) {
    __extends(EntityManager, _super);
    function EntityManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onInit = function () { };
        _this.onTick = function () {
            var toDelete = _this.getEntitesByTag("toBedeleTed123");
            for (var i = toDelete.length - 1; i >= 0; i--) {
                _this.deleteEntity(toDelete[i].name);
            }
        };
        _this.entities = [];
        _this.nextID = 0;
        return _this;
    }
    EntityManager.prototype.createEntity = function (name) {
        if (name === void 0) { name = "Ent-" + ++this.nextID; }
        var last = this.entities.push(new Entity(name)) - 1;
        return this.entities[last];
    };
    EntityManager.prototype.getEntity = function (name) {
        return this.entities.find(function (e) { return e.name === name; });
    };
    EntityManager.prototype.getEntityIndex = function (name) {
        return this.entities.findIndex(function (e) { return e.name === name; });
    };
    EntityManager.prototype.getEntitesByTag = function (tag) {
        return this.entities.filter(function (en) { return en.tags.has(tag); });
    };
    EntityManager.prototype.deleteEntity = function (name) {
        var _a;
        var index = this.getEntityIndex(name);
        if (index != -1) {
            var e = this.entities[index];
            (_a = e.parent) === null || _a === void 0 ? void 0 : _a.removeChild(e.name);
            for (var prop in e) {
                if (e.hasOwnProperty(prop)) {
                    delete e[prop];
                }
            }
            this.entities.splice(index, 1);
        }
    };
    return EntityManager;
}(System));

var Scene = /** @class */ (function () {
    function Scene(name) {
        this.name = "";
        this.entityManager = new EntityManager;
        this._scFunc = function () { };
        this.name = name;
    }
    Object.defineProperty(Scene.prototype, "sceneCreator", {
        set: function (s) {
            this._scFunc = s;
        },
        enumerable: false,
        configurable: true
    });
    Scene.prototype.create = function () {
        this.entityManager = new EntityManager();
        this._scFunc(this.entityManager);
        return this;
    };
    return Scene;
}());

var Runtime = {
    GlobalStorage: new Map()
};

var Colider = /** @class */ (function () {
    function Colider() {
        this.entity = new Entity("temp");
        this.type = "colidercomponent";
        this.initialized = true;
        this.enabled = true;
        this.onInit = function () { };
        this.overlappingWith = [];
    }
    Colider.type = "colidercomponent";
    return Colider;
}());

var ColiderManager = /** @class */ (function (_super) {
    __extends(ColiderManager, _super);
    function ColiderManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onInit = function () {
        };
        _this.onTick = function () {
            var coliders = [];
            for (var i = 0; i < Runtime.EntityManager.entities.length; i++) {
                var colid = Runtime.EntityManager.entities[i].getComponent(Colider.type);
                if (colid) {
                    if (!colid.initialized) {
                        colid.onInit();
                        colid.initialized = true;
                    }
                    coliders.push(colid);
                }
            }
            for (var i = 0; i < coliders.length - 1; i++) {
                var colider = coliders[i];
                if (!colider.enabled) {
                    colider.overlappingWith = [];
                }
                else {
                    var _loop_1 = function (j) {
                        var index = colider.overlappingWith.findIndex(function (c) { return c.entity.name === coliders[j].entity.name; });
                        if (colider.isOverlapping(coliders[j])) {
                            if (index === -1 && colider.enabled && coliders[i].enabled) {
                                colider.entity.triggerEvent(ColiderManager.colissionEvent, [coliders[j]]);
                                coliders[j].entity.triggerEvent(ColiderManager.colissionEvent, [colider]);
                                colider.overlappingWith.push(coliders[j]);
                                coliders[j].overlappingWith.push(colider);
                            }
                        }
                        else {
                            colider.overlappingWith.splice(index, 1);
                        }
                    };
                    for (var j = i + 1; j < coliders.length; j++) {
                        _loop_1(j);
                    }
                }
            }
        };
        return _this;
    }
    ColiderManager.colissionEvent = "collisionhappened";
    return ColiderManager;
}(System));

var ScriptComponent = /** @class */ (function () {
    function ScriptComponent(name) {
        var _this = this;
        if (name === void 0) { name = "Script-" + Math.round(Math.random() * 1000000); }
        this.basicType = "script";
        this._entity = new Entity("temp");
        this.enabled = true;
        this.initialized = false;
        this._onEvent = function (name, payload) {
            switch (name) {
                case ColiderManager.colissionEvent:
                    _this.onCollision(payload[0]);
                    break;
            }
        };
        this.onCollision = function (colider) { };
        this.type = name;
    }
    Object.defineProperty(ScriptComponent.prototype, "entity", {
        get: function () {
            return this._entity;
        },
        set: function (e) {
            this._entity = e;
            this._selfInit();
        },
        enumerable: false,
        configurable: true
    });
    ScriptComponent.prototype._selfInit = function () {
        this.entity.addEventListener(this._onEvent);
    };
    ScriptComponent.type = "script";
    return ScriptComponent;
}());

var LoadingManager = /** @class */ (function (_super) {
    __extends(LoadingManager, _super);
    function LoadingManager(mediaManager) {
        var _this = _super.call(this) || this;
        _this._itemsLoaded = 0;
        _this._itemsTotal = 0;
        _this._doneLoading = false;
        _this.onInit = function () {
            console.log(">> Started loading manager");
            _this._mediaManager.onStart = function (total) {
                _this._itemsTotal = total;
            };
            _this._mediaManager.onItemLoaded = function (loaded, total) {
                _this._itemsLoaded = loaded;
                _this._itemsTotal = total;
            };
            _this._mediaManager.onEnd = function () {
                _this._doneLoading = true;
            };
            _this._mediaManager.loadMedia();
        };
        _this.onTick = function () {
            var _a;
            //! remove
            console.log("Loaded: " + _this._itemsLoaded + ", Total: " + _this._itemsTotal);
            if (_this._doneLoading) {
                (_a = Runtime.SceneManager) === null || _a === void 0 ? void 0 : _a.setScene(Runtime.Project.startScene);
            }
        };
        _this._mediaManager = mediaManager;
        return _this;
    }
    return LoadingManager;
}(ScriptComponent));

function LoadingScene(mediaMgr) {
    var s = new Scene("loadingScene");
    s.sceneCreator = function (entMgr) {
        var loader = entMgr.createEntity("loadingManager");
        var loadingComponent = new LoadingManager(mediaMgr);
        loader.addComponent(loadingComponent);
    };
    return s;
}

var MediaTypes;
(function (MediaTypes) {
    MediaTypes[MediaTypes["TEXT"] = 0] = "TEXT";
    MediaTypes[MediaTypes["JSON"] = 1] = "JSON";
    MediaTypes[MediaTypes["IMAGE"] = 2] = "IMAGE";
    MediaTypes[MediaTypes["AUDIO"] = 3] = "AUDIO";
    MediaTypes[MediaTypes["BLOB"] = 4] = "BLOB";
})(MediaTypes || (MediaTypes = {}));

var MediaStorage = /** @class */ (function () {
    function MediaStorage() {
        this._media = new Map();
    }
    MediaStorage.prototype.getMedia = function (name) {
        return this._media.get(name);
    };
    MediaStorage.prototype.setMedia = function (name, media) {
        this._media.set(name, media);
    };
    return MediaStorage;
}());

var MediaManager = /** @class */ (function () {
    function MediaManager() {
        this._mediaSrc = [];
        this._media = new MediaStorage();
        this.onItemLoaded = function () { };
        this.onEnd = function () { };
        this.onStart = function (totalItems) { };
    }
    Object.defineProperty(MediaManager.prototype, "media", {
        set: function (m) {
            this._mediaSrc = m;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MediaManager.prototype, "MediaStorage", {
        get: function () {
            return this._media;
        },
        enumerable: false,
        configurable: true
    });
    MediaManager.prototype.loadMedia = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadedItems, i, m, res, data, _a, blob, url, img, blob1, url1, audio;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.onStart(this._mediaSrc.length);
                        loadedItems = 0;
                        i = 0;
                        _b.label = 1;
                    case 1:
                        if (!(i < this._mediaSrc.length)) return [3 /*break*/, 16];
                        m = this._mediaSrc[i];
                        return [4 /*yield*/, fetch(m.src)];
                    case 2:
                        res = _b.sent();
                        data = undefined;
                        _a = m.type;
                        switch (_a) {
                            case MediaTypes.TEXT: return [3 /*break*/, 3];
                            case MediaTypes.JSON: return [3 /*break*/, 5];
                            case MediaTypes.BLOB: return [3 /*break*/, 7];
                            case MediaTypes.IMAGE: return [3 /*break*/, 9];
                            case MediaTypes.AUDIO: return [3 /*break*/, 12];
                        }
                        return [3 /*break*/, 14];
                    case 3: return [4 /*yield*/, res.text()];
                    case 4:
                        data = _b.sent();
                        return [3 /*break*/, 14];
                    case 5: return [4 /*yield*/, res.json()];
                    case 6:
                        data = _b.sent();
                        return [3 /*break*/, 14];
                    case 7: return [4 /*yield*/, res.blob()];
                    case 8:
                        data = _b.sent();
                        return [3 /*break*/, 14];
                    case 9: return [4 /*yield*/, res.blob()];
                    case 10:
                        blob = _b.sent();
                        url = URL.createObjectURL(blob);
                        img = new Image();
                        img.src = url;
                        return [4 /*yield*/, img.decode()];
                    case 11:
                        _b.sent();
                        data = img;
                        return [3 /*break*/, 14];
                    case 12: return [4 /*yield*/, res.blob()];
                    case 13:
                        blob1 = _b.sent();
                        url1 = URL.createObjectURL(blob1);
                        audio = new Audio();
                        audio.src = url1;
                        data = audio;
                        return [3 /*break*/, 14];
                    case 14:
                        this._media.setMedia(m.name, data);
                        this.onItemLoaded(++loadedItems, this._mediaSrc.length);
                        _b.label = 15;
                    case 15:
                        i++;
                        return [3 /*break*/, 1];
                    case 16:
                        this.onEnd();
                        return [2 /*return*/];
                }
            });
        });
    };
    return MediaManager;
}());

var SceneManager = /** @class */ (function () {
    function SceneManager(scenes, loadingScene) {
        this._scenes = scenes;
        this.currentScene = loadingScene.create();
        Runtime.EntityManager = this.currentScene.entityManager;
    }
    SceneManager.prototype.setScene = function (name) {
        if (this._scenes.has(name)) {
            console.log(">> Switching to scene: ", name);
            this.currentScene = this._scenes.get(name).create();
            Runtime.EntityManager = this.currentScene.entityManager;
        }
        else
            throw new Error("Scene " + name + " doesn't exist in project");
    };
    return SceneManager;
}());

var Input = {};

var InputHandler = /** @class */ (function (_super) {
    __extends(InputHandler, _super);
    function InputHandler() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._keyMapping = new Map();
        _this._keys = new Map();
        _this.onInit = function () {
            var map = Runtime.Project.keyMapping;
            var _loop_1 = function (i) {
                Input[map[i].event] = false;
                map[i].keys.forEach(function (k) {
                    _this._keyMapping.set(k, map[i].event);
                });
            };
            for (var i = 0; i < map.length; i++) {
                _loop_1(i);
            }
            Runtime.Input = Input;
            Runtime.Project.rootElement.setAttribute("tabindex", "1");
            Runtime.Project.rootElement.addEventListener("keydown", function (e) {
                if (e.key === "Tab" || e.key === "Alt" || e.key === "ContextMenu") {
                    e.preventDefault();
                    e.stopPropagation();
                }
                _this._keys.set(e.key, true);
            });
            Runtime.Project.rootElement.addEventListener("keyup", function (e) {
                _this._keys.set(e.key, false);
            });
            Runtime.Project.rootElement.addEventListener("contextmenu", function (e) {
                e.preventDefault();
            });
        };
        _this.onTick = function () {
            var map = Runtime.Project.keyMapping;
            for (var i = 0; i < map.length; i++) {
                var final = false;
                for (var j = 0; j < map[i].keys.length; j++) {
                    if (_this._keys.get(map[i].keys[j])) {
                        final = true;
                        break;
                    }
                }
                Input[map[i].event] = final;
            }
        };
        return _this;
    }
    return InputHandler;
}(System));

var RendnerComponent = /** @class */ (function () {
    function RendnerComponent() {
        this.initialized = false;
        this.enabled = true;
        this.onInit = function () { };
        this.entity = new Entity("temp");
        this.size = new Vec2(0, 0);
        this.type = "RenderComponent";
    }
    RendnerComponent.type = "RenderComponent";
    return RendnerComponent;
}());

var Renderer = /** @class */ (function (_super) {
    __extends(Renderer, _super);
    function Renderer() {
        var _this = _super.call(this) || this;
        _this._resW = 0;
        _this._resH = 0;
        _this.onInit = function () {
            var _a;
            _this._resH = Runtime.Project.resolution.y;
            _this._resW = Runtime.Project.resolution.x;
            _this._canvas.width = _this._resW;
            _this._canvas.height = _this._resH;
            _this._canvas.style.imageRendering = "pixelated";
            (_a = Runtime.Project.rootElement) === null || _a === void 0 ? void 0 : _a.appendChild(_this._canvas);
            _this._context2d.imageSmoothingEnabled = false;
        };
        _this.onTick = function () {
            _this._context2d.fillStyle = "black";
            _this._context2d.fillRect(0, 0, _this._resW, _this._resH);
            for (var i = 0; i < Runtime.EntityManager.entities.length; i++) {
                var r = Runtime.EntityManager.entities[i].getComponent(RendnerComponent.type);
                if (r) {
                    if (!r.initialized) {
                        r.onInit();
                        r.initialized = true;
                    }
                    if (r.enabled) {
                        r.onTick(_this._context2d);
                    }
                }
            }
        };
        _this._canvas = document.createElement("canvas");
        _this._canvas.style.width = "100%";
        _this._context2d = _this._canvas.getContext("2d");
        return _this;
    }
    return Renderer;
}(System));

var ScriptProcessor = /** @class */ (function (_super) {
    __extends(ScriptProcessor, _super);
    function ScriptProcessor() {
        var _this = _super.call(this) || this;
        _this.onInit = function () {
            for (var i = 0; i < Runtime.EntityManager.entities.length; i++) {
                var s = Runtime.EntityManager.entities[i].getComponentsByBasicType(ScriptComponent.type);
                if (s.length > 0) {
                    for (var j = 0; j < s.length; j++) {
                        s[j].onInit();
                        s[j].initialized = true;
                    }
                }
            }
        };
        _this.onTick = function () {
            for (var i = 0; i < Runtime.EntityManager.entities.length; i++) {
                var s = Runtime.EntityManager.entities[i].getComponentsByBasicType(ScriptComponent.type);
                if (s.length > 0) {
                    for (var j = 0; j < s.length; j++) {
                        if (!s[j].initialized) {
                            s[j].onInit();
                            s[j].initialized = true;
                        }
                        if (s[j].enabled) {
                            s[j].onTick();
                        }
                    }
                }
            }
        };
        return _this;
    }
    return ScriptProcessor;
}(System));

var SystemManager = /** @class */ (function () {
    function SystemManager() {
        //staicly add systems
        this._renderer = new Renderer();
        this._scriptProcessor = new ScriptProcessor();
        this._inputHandler = new InputHandler();
        this._collisionManager = new ColiderManager();
    }
    SystemManager.prototype.init = function () {
        this._inputHandler.onInit();
        this._renderer.onInit();
        this._scriptProcessor.onInit();
        this._collisionManager.onInit();
    };
    SystemManager.prototype.functionalTick = function () {
        this._inputHandler.onTick();
        this._scriptProcessor.onTick();
        this._collisionManager.onTick();
        Runtime.EntityManager.onTick();
    };
    SystemManager.prototype.renderTick = function () {
        this._renderer.onTick();
    };
    return SystemManager;
}());

var Main = /** @class */ (function () {
    function Main(project) {
        this.systemManager = new SystemManager();
        this.mediaManager = new MediaManager();
        this.sceneManager = new SceneManager(project.scenes, LoadingScene(this.mediaManager));
        Runtime.Project = project;
        this.project = project;
    }
    Main.prototype.load = function () {
        console.log("\n         ______  _______      _             \n        (____  \\(_______)    (_)            \n         ____)  )_____   ____ _ ____   ____ \n        |  __  (|  ___) / _  | |  _ \\ / _  )\n        | |__)  ) |____( ( | | | | | ( (/ / \n        |______/|_______)_|| |_|_| |_|\\____)\n                       (_____| By reKOmo\n        ");
        this.mediaManager.media = this.project.media;
        Runtime.SceneManager = this.sceneManager;
        Runtime.Media = this.mediaManager.MediaStorage;
        this.systemManager.init();
    };
    Main.prototype.start = function () {
        this._loop(0, 0);
    };
    Main.prototype._loop = function (lastTickTime, tFrame) {
        var tpsTime = 1000 / this.project.tps;
        var timeFromLastFrame = tFrame - lastTickTime;
        //Update deltatime
        Runtime.deltaTime = timeFromLastFrame / 1000;
        var currTickTime = lastTickTime;
        // run update function on tick
        if (timeFromLastFrame >= tpsTime) {
            this.systemManager.functionalTick();
            currTickTime = tFrame;
        }
        //render
        this.systemManager.renderTick();
        window.requestAnimationFrame(this._loop.bind(this, currTickTime));
    };
    return Main;
}());

var Project = /** @class */ (function () {
    function Project() {
        this.resolution = new Vec2(200, 200);
        this.scenes = new Map();
        this.startScene = "";
        this.tps = 20;
        this.keyMapping = [];
        this.media = [];
    }
    Project.prototype.addScene = function (scene) {
        this.scenes.set(scene.name, scene);
    };
    return Project;
}());

var SpriteComponent = /** @class */ (function (_super) {
    __extends(SpriteComponent, _super);
    function SpriteComponent(spritesheet, w, h, srcW, srcH) {
        var _this = _super.call(this) || this;
        _this.frame = 0;
        _this.isReset = true;
        _this.onTick = function (context) {
            context.drawImage(_this.coloredSpiteSheet, 0, _this.srcH * _this.frame, _this.srcW, _this.srcH, _this.entity.absoluteTransform.x, _this.entity.absoluteTransform.y, _this.w, _this.h);
        };
        _this.spriteSheet = spritesheet;
        _this.coloredSpiteSheet = spritesheet.cloneNode();
        _this.w = w ? w : _this.spriteSheet.width;
        _this.h = h ? h : _this.spriteSheet.height;
        _this.srcW = srcW ? srcW : _this.w;
        _this.srcH = srcH ? srcH : _this.h;
        return _this;
    }
    SpriteComponent.prototype.applyPallet = function (pallet) {
        this.isReset = false;
        var can = document.createElement("canvas");
        can.width = this.spriteSheet.width;
        can.height = this.spriteSheet.height;
        var ctx = can.getContext("2d");
        //ctx!.fillStyle = `#${hexColor}`
        //ctx!.fillRect(0, 0, this.srcW, this.srcH);
        //ctx!.globalCompositeOperation = "destination-in";
        ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(this.spriteSheet, 0, 0);
        var imgData = ctx.getImageData(0, 0, this.spriteSheet.width, this.spriteSheet.height);
        for (var i = 0; i < imgData.data.length; i += 4) {
            var grayscale = Math.floor((imgData.data[i] + imgData.data[i + 1] + imgData.data[i + 2]) / 3);
            var newValue = pallet.getMapping(grayscale);
            if (newValue) {
                imgData.data[i] = newValue.r;
                imgData.data[i + 1] = newValue.g;
                imgData.data[i + 2] = newValue.b;
            }
        }
        ctx === null || ctx === void 0 ? void 0 : ctx.putImageData(imgData, 0, 0);
        this.coloredSpiteSheet.src = can.toDataURL();
    };
    SpriteComponent.prototype.resetSprite = function () {
        if (!this.isReset) {
            this.coloredSpiteSheet = this.spriteSheet.cloneNode();
            this.isReset = true;
        }
    };
    return SpriteComponent;
}(RendnerComponent));

function GameOver(mgr) {
    var _a;
    var e = mgr.createEntity();
    var sprite = new SpriteComponent((_a = Runtime.Media) === null || _a === void 0 ? void 0 : _a.getMedia("game_over"), 336, 224);
    e.addComponent(sprite);
    var controller = new GameOverController();
    e.addComponent(controller);
}
var GameOverController = /** @class */ (function (_super) {
    __extends(GameOverController, _super);
    function GameOverController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.timePassed = 0;
        _this.ticks = 0;
        _this.onInit = function () {
            _this.sprite = _this.entity.getComponent(RendnerComponent.type);
        };
        _this.onTick = function () {
            var _a, _b;
            _this.ticks++;
            _this.timePassed += Runtime.deltaTime;
            if (_this.ticks % 2 == 0) {
                _this.sprite.frame = (_this.sprite.frame + 1) % 13;
            }
            if (_this.timePassed > 10 || Runtime.Input.enter) {
                var maxScore = Runtime.GlobalStorage.get("scores")[0].score;
                if (Runtime.GlobalStorage.get("currentScore") > maxScore) {
                    (_a = Runtime.SceneManager) === null || _a === void 0 ? void 0 : _a.setScene("save_menu");
                }
                else {
                    (_b = Runtime.SceneManager) === null || _b === void 0 ? void 0 : _b.setScene("main_menu");
                }
            }
        };
        return _this;
    }
    return GameOverController;
}(ScriptComponent));

function SaveMenu(mgr) {
    var _a;
    var e = mgr.createEntity();
    var sprite = new DrawableSprite((_a = Runtime.Media) === null || _a === void 0 ? void 0 : _a.getMedia("save_score"), 336, 224);
    e.addComponent(sprite);
    var controller = new SaveMenuController();
    e.addComponent(controller);
}
var DrawableSprite = /** @class */ (function (_super) {
    __extends(DrawableSprite, _super);
    function DrawableSprite(spritesheet, w, h, srcW, srcH) {
        var _this = _super.call(this) || this;
        _this.frame = 0;
        _this.onTick = function (context) {
            context.drawImage(_this.spriteSheet, 0, _this.srcH * _this.frame, _this.srcW, _this.srcH, _this.entity.absoluteTransform.x, _this.entity.absoluteTransform.y, _this.w, _this.h);
            _this.draw(context);
        };
        _this.draw = function () { };
        _this.spriteSheet = spritesheet;
        _this.w = w ? w : _this.spriteSheet.width;
        _this.h = h ? h : _this.spriteSheet.height;
        _this.srcW = srcW ? srcW : _this.w;
        _this.srcH = srcH ? srcH : _this.h;
        return _this;
    }
    return DrawableSprite;
}(RendnerComponent));
var SaveMenuController = /** @class */ (function (_super) {
    __extends(SaveMenuController, _super);
    function SaveMenuController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.timePassed = 0;
        _this.ticks = 0;
        _this.letters = Array.from("?ABCDEFGHIJKLMNOPQRTSVUWXYZ");
        _this.selecectedLetters = [0, 0, 0];
        _this.configming = 0;
        _this.keyDown = true;
        _this.onInit = function () {
            _this.sprite = _this.entity.getComponent(RendnerComponent.type);
            _this.sprite.draw = _this.draw;
        };
        _this.onTick = function () {
            var _a;
            _this.ticks++;
            _this.timePassed += Runtime.deltaTime;
            if (!_this.keyDown && Runtime.Input.enter) {
                _this.keyDown = true;
                _this.configming++;
                if (_this.configming == 3) {
                    var s = Runtime.GlobalStorage.get("scores");
                    s.pop();
                    s.unshift({ name: _this.getName(), score: Runtime.GlobalStorage.get("currentScore") });
                    Runtime.GlobalStorage.set("currentScore", 0);
                    (_a = Runtime.SceneManager) === null || _a === void 0 ? void 0 : _a.setScene("hall_of_fame");
                }
            }
            if (!Runtime.Input.enter) {
                _this.keyDown = false;
            }
            if (Runtime.Input.up && _this.ticks % 3 == 0) {
                _this.selecectedLetters[_this.configming] = (_this.selecectedLetters[_this.configming] + 1) % _this.letters.length;
            }
            if (Runtime.Input.down && _this.ticks % 3 == 0) {
                _this.selecectedLetters[_this.configming] = _this.selecectedLetters[_this.configming] - 1 < 0 ? _this.letters.length - 1 : _this.selecectedLetters[_this.configming] - 1;
            }
        };
        _this.draw = function (context) {
            context.fillStyle = "white";
            context.font = "20px 8 Bit Wonder";
            context.fillText(_this.formatScore(Runtime.GlobalStorage.get("currentScore")) + "            " + _this.getName(), 102, 95);
        };
        return _this;
    }
    SaveMenuController.prototype.getName = function () {
        return this.letters[this.selecectedLetters[0]] + this.letters[this.selecectedLetters[1]] + this.letters[this.selecectedLetters[2]];
    };
    SaveMenuController.prototype.formatScore = function (score) {
        var finalD = 6;
        var digits = score == 0 ? 1 : Math.floor(Math.log10(score) + 1);
        var fText = "";
        for (var i = 0; i < finalD - digits; i++) {
            fText += "0";
        }
        return fText + score;
    };
    return SaveMenuController;
}(ScriptComponent));

function HallOfFame(mgr) {
    var _a;
    var e = mgr.createEntity();
    var sprite = new DrawableSprite((_a = Runtime.Media) === null || _a === void 0 ? void 0 : _a.getMedia("hallOfFame"), 336, 224);
    e.addComponent(sprite);
    var controller = new HAllOfFAmeController();
    e.addComponent(controller);
}
var HAllOfFAmeController = /** @class */ (function (_super) {
    __extends(HAllOfFAmeController, _super);
    function HAllOfFAmeController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.timePassed = 0;
        _this.ticks = 0;
        _this.keyDown = true;
        _this.scores = [];
        _this.onInit = function () {
            _this.sprite = _this.entity.getComponent(RendnerComponent.type);
            _this.sprite.draw = _this.draw;
            //Runtime.GlobalStorage.set("scores", [{ name: "aaa", score: 123 }, { name: "aaa", score: 123 }, { name: "aaa", score: 123 }, { name: "aaa", score: 123 }, { name: "aaa", score: 123 }])
            _this.scores = Runtime.GlobalStorage.get("scores");
        };
        _this.onTick = function () {
            var _a, _b;
            _this.ticks++;
            _this.timePassed += Runtime.deltaTime;
            if (!Runtime.Input.enter)
                _this.keyDown = false;
            if (Runtime.Input.enter && !_this.keyDown) {
                (_a = Runtime.SceneManager) === null || _a === void 0 ? void 0 : _a.setScene("wait_for_level");
            }
            if (_this.timePassed > 10) {
                (_b = Runtime.SceneManager) === null || _b === void 0 ? void 0 : _b.setScene("main_menu");
            }
        };
        _this.draw = function (context) {
            context.fillStyle = "white";
            context.font = "20px 8 Bit Wonder";
            for (var i = 0; i < _this.scores.length; i++) {
                context.fillText(_this.formatScore(_this.scores[i].score) + "            " + _this.scores[i].name, 100, 69 + i * 24);
            }
        };
        return _this;
    }
    HAllOfFAmeController.prototype.formatScore = function (score) {
        var finalD = 6;
        var digits = score == 0 ? 1 : Math.floor(Math.log10(score) + 1);
        var fText = "";
        for (var i = 0; i < finalD - digits; i++) {
            fText += "0";
        }
        return fText + score;
    };
    return HAllOfFAmeController;
}(ScriptComponent));

var SquareColider = /** @class */ (function (_super) {
    __extends(SquareColider, _super);
    function SquareColider(w, h) {
        var _this = _super.call(this) || this;
        _this.isOverlapping = function (colider) {
            return (_this.x1 > colider.x &&
                _this.x < colider.x1 &&
                _this.y < colider.y1 &&
                _this.y1 > colider.y);
        };
        _this.w = w;
        _this.h = h;
        return _this;
    }
    Object.defineProperty(SquareColider.prototype, "x", {
        get: function () {
            return this.entity.absoluteTransform.x;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SquareColider.prototype, "x1", {
        get: function () {
            return this.entity.absoluteTransform.x + this.w;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SquareColider.prototype, "y", {
        get: function () {
            return this.entity.absoluteTransform.y;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SquareColider.prototype, "y1", {
        get: function () {
            return this.entity.absoluteTransform.y + this.h;
        },
        enumerable: false,
        configurable: true
    });
    return SquareColider;
}(Colider));

function randomNumberInRange(min, max) {
    return Math.random() * (max - min) + min;
}

var ColorPallet = /** @class */ (function () {
    function ColorPallet() {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.map = new Map();
        args.forEach(function (m) {
            _this.map.set(m.selectorValue, m.to);
        });
    }
    ColorPallet.prototype.getMapping = function (value) {
        var c = this.map.get(value);
        return c;
    };
    return ColorPallet;
}());

var Constants = {
    WORLD_SPEED: 40,
    WORLD_TILE_SIZE: 20,
    PLAYER_SIZE: { x: 16, y: 18 },
    WORLD_MAX_X: 320,
    WORLD_MAX_Y: 176,
    WORLD_MIN_Y: 16,
};
var ColorPallets = {
    GREEN: new ColorPallet({ selectorValue: 59, to: { r: 0, g: 59, b: 0 } }, { selectorValue: 134, to: { r: 0, g: 134, b: 43 } }, { selectorValue: 230, to: { r: 97, g: 230, b: 154 } }),
    RED: new ColorPallet({ selectorValue: 59, to: { r: 7, g: 42, b: 0 } }, { selectorValue: 134, to: { r: 131, g: 41, b: 0 } }, { selectorValue: 230, to: { r: 210, g: 163, b: 58 } }, { selectorValue: 255, to: { r: 255, g: 182, b: 140 } }),
    YELLOW: new ColorPallet({ selectorValue: 59, to: { r: 96, g: 67, b: 51 } }, { selectorValue: 134, to: { r: 210, g: 121, b: 76 } }, { selectorValue: 230, to: { r: 207, g: 177, b: 62 } }, { selectorValue: 255, to: { r: 252, g: 252, b: 152 } }),
    BLUE: new ColorPallet({ selectorValue: 59, to: { r: 54, g: 73, b: 153 } }, { selectorValue: 134, to: { r: 73, g: 141, b: 208 } }, { selectorValue: 230, to: { r: 108, g: 123, b: 242 } }, { selectorValue: 255, to: { r: 161, g: 168, b: 211 } }),
    PINK: new ColorPallet({ selectorValue: 59, to: { r: 7, g: 7, b: 106 } }, { selectorValue: 134, to: { r: 172, g: 66, b: 172 } }, { selectorValue: 230, to: { r: 221, g: 76, b: 221 } }, { selectorValue: 255, to: { r: 248, g: 161, b: 248 } }),
};

function Explosion(mgr) {
    var _a;
    var e = mgr.createEntity();
    var s = new SpriteComponent((_a = Runtime.Media) === null || _a === void 0 ? void 0 : _a.getMedia("player_explosion"), 14, 20);
    e.addComponent(s);
    var c = new ExpolsionC(13);
    e.addComponent(c);
    return e;
}
function EnemyExplosion(mgr) {
    var _a;
    var e = mgr.createEntity();
    var s = new SpriteComponent((_a = Runtime.Media) === null || _a === void 0 ? void 0 : _a.getMedia("enemy_explosion"), 18, 20);
    s.applyPallet(Runtime.GlobalStorage.get(LevelInfo.PALLET));
    e.addComponent(s);
    var c = new ExpolsionC(5);
    e.addComponent(c);
    return e;
}
var ExpolsionC = /** @class */ (function (_super) {
    __extends(ExpolsionC, _super);
    function ExpolsionC(maxF) {
        var _this = _super.call(this) || this;
        _this.ticks = 0;
        _this.onInit = function () {
            _this._sprite = _this.entity.getComponent(RendnerComponent.type);
        };
        _this.onTick = function () {
            if (_this.ticks % 3 == 0 && _this._sprite.frame < _this.maxF) {
                _this._sprite.frame++;
            }
            if (_this._sprite.frame === _this.maxF) {
                _this.entity.deleteSelf();
            }
            _this.ticks++;
        };
        _this.maxF = maxF;
        return _this;
    }
    return ExpolsionC;
}(ScriptComponent));

var ItemController = /** @class */ (function (_super) {
    __extends(ItemController, _super);
    function ItemController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.moveVector = new Vec2(-Constants.WORLD_SPEED, 0);
        _this.onInit = function () {
        };
        _this.onTick = function () {
            _this.entity.transform = _this.entity.transform.add(_this.moveVector.multiplyScalar(Runtime.deltaTime));
            if (_this.entity.transform.x <= 0) {
                _this.entity.deleteSelf();
            }
        };
        _this.onCollision = function (colider) {
            if (colider.entity.name == "player") {
                _this.entity.deleteSelf();
            }
        };
        return _this;
    }
    return ItemController;
}(ScriptComponent));

var Items;
(function (Items) {
    Items["HP"] = "live";
    Items["BASIC_GUN"] = "bgun";
    Items["PULS_GUN"] = "pulsgun";
    Items["RAIL_GUN"] = "railgun";
    Items["EWAY_GUN"] = "ewaygun";
})(Items || (Items = {}));

var BasicEnemyController = /** @class */ (function (_super) {
    __extends(BasicEnemyController, _super);
    function BasicEnemyController() {
        var _this = _super.call(this, "basicEnemyController") || this;
        _this.moveVector = new Vec2(Constants.WORLD_SPEED, 0);
        _this.maxHealth = 5;
        _this.health = 5;
        _this.manageDeath = true;
        _this.onInit = function () {
            var _a, _b;
            _this.player = (_b = (_a = Runtime.EntityManager) === null || _a === void 0 ? void 0 : _a.getEntity("player")) === null || _b === void 0 ? void 0 : _b.getComponent("player_contoler");
            _this.sprite = _this.entity.getComponent(RendnerComponent.type);
            _this.entity.addTag("enemy");
            _this.levelManager = Runtime.EntityManager.getEntity("levelmanager").getComponent("levelmanager");
            if (_this.manageDeath)
                _this.levelManager.enemiesAlive++;
        };
        _this.onTick = function () {
            _this.entity.transform.add(_this.moveVector.multiplyScalar(Runtime.deltaTime));
            if (_this.entity.absoluteTransform.x <= 0) {
                _this.killSelf();
            }
        };
        _this.onCollision = function (colider) {
            if (colider.entity.hasTag("player_bullet")) {
                var controller = colider.entity.getComponent("bulletcontroller");
                if (controller) {
                    if (_this.entity.transform.x < Constants.WORLD_MAX_X - 1) {
                        _this.health -= controller.damage;
                    }
                    if (_this.health <= 0) {
                        _this.player.score += 50;
                        var e = EnemyExplosion(Runtime.EntityManager);
                        e.transform = _this.entity.absoluteTransform.clone();
                        _this.killSelf();
                    }
                }
            }
        };
        return _this;
    }
    BasicEnemyController.prototype.killSelf = function () {
        this.entity.addTag("dead");
        this.sprite.enabled = false;
        this.dropItem();
        if (this.manageDeath && this.levelManager.enemiesAlive > 0) {
            this.levelManager.enemiesAlive--;
            this.entity.deleteSelf();
        }
    };
    BasicEnemyController.prototype.dropItem = function () {
        var _a, _b, _c, _d, _e;
        if (this.itemToDrop) {
            var item = Runtime.EntityManager.createEntity();
            item.addTag("item");
            item.addTag(this.itemToDrop);
            var sprite = undefined;
            switch (this.itemToDrop) {
                case Items.HP:
                    sprite = new SpriteComponent((_a = Runtime.Media) === null || _a === void 0 ? void 0 : _a.getMedia("hp_icon"));
                    break;
                case Items.BASIC_GUN:
                    sprite = new SpriteComponent((_b = Runtime.Media) === null || _b === void 0 ? void 0 : _b.getMedia("hud_guns"), 22, 15);
                    break;
                case Items.EWAY_GUN:
                    sprite = new SpriteComponent((_c = Runtime.Media) === null || _c === void 0 ? void 0 : _c.getMedia("hud_guns"), 22, 15);
                    sprite.frame = 3;
                    break;
                case Items.RAIL_GUN:
                    sprite = new SpriteComponent((_d = Runtime.Media) === null || _d === void 0 ? void 0 : _d.getMedia("hud_guns"), 22, 15);
                    sprite.frame = 1;
                    break;
                case Items.PULS_GUN:
                    sprite = new SpriteComponent((_e = Runtime.Media) === null || _e === void 0 ? void 0 : _e.getMedia("hud_guns"), 22, 15);
                    sprite.frame = 2;
                    break;
            }
            item.addComponent(sprite);
            item.transform = this.entity.absoluteTransform.clone();
            item.transform.x += Math.floor(randomNumberInRange(-3, 3));
            item.transform.y += Math.floor(randomNumberInRange(-3, 3));
            var colider = new SquareColider(22, 15);
            item.addComponent(colider);
            var cont = new ItemController();
            item.addComponent(cont);
            this.itemToDrop = undefined;
        }
    };
    return BasicEnemyController;
}(ScriptComponent));

var BlockBunchController = /** @class */ (function (_super) {
    __extends(BlockBunchController, _super);
    function BlockBunchController() {
        var _this = _super.call(this, "blockBunchController") || this;
        _this.top = true;
        _this.blocks = [];
        _this.timePassed = 0;
        _this.lastGo = 0;
        _this.waitDutration = 0.4;
        _this.makeGo = 0;
        _this.batchSize = 6;
        _this.blocksAlive = _this.batchSize;
        _this.onInit = function () {
            _this.levelManager = Runtime.EntityManager.getEntity("levelmanager").getComponent("levelmanager");
            _this.levelManager.enemiesAlive++;
            if (_this.top) {
                for (var i = 0; i < _this.batchSize; i++) {
                    var e = DiagnalBlock(Runtime.EntityManager);
                    e.transform = new Vec2(30 + i * 16, Constants.WORLD_MIN_Y);
                    var c = e.getComponent("diagblock");
                    _this.blocks.push(c);
                }
            }
            else {
                _this.waitDutration = 0.3;
                for (var i = 0; i < _this.batchSize; i++) {
                    var e = StairBlock(Runtime.EntityManager);
                    e.transform = new Vec2(30 + i * 16, Constants.WORLD_MAX_Y - 22);
                    var c = e.getComponent("stairblock");
                    _this.blocks.push(c);
                }
            }
        };
        _this.onTick = function () {
            _this.timePassed += Runtime.deltaTime;
            if (_this.timePassed - _this.lastGo > _this.waitDutration) {
                _this.lastGo = _this.timePassed;
                if (_this.makeGo < _this.batchSize) {
                    _this.blocks[_this.batchSize - 1 - _this.makeGo].go();
                    _this.makeGo++;
                }
            }
            for (var i = _this.blocks.length - 1; i >= 0; i--) {
                if (_this.blocks[i].entity.hasTag("dead")) {
                    _this.blocksAlive--;
                    _this.blocks[i].entity.deleteSelf();
                    _this.blocks.splice(i, 1);
                }
            }
            if (_this.blocksAlive == 0) {
                _this.levelManager.enemiesAlive--;
                _this.entity.deleteSelf();
            }
        };
        return _this;
    }
    return BlockBunchController;
}(ScriptComponent));

var BlockBaseController = /** @class */ (function (_super) {
    __extends(BlockBaseController, _super);
    function BlockBaseController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onInit = function () {
            var _a;
            _this.control = (_a = Runtime.EntityManager.getEntity("blockBunchController")) === null || _a === void 0 ? void 0 : _a.getComponent("blockBunchController");
        };
        return _this;
    }
    return BlockBaseController;
}(ScriptComponent));

var BlockDiagnal = /** @class */ (function (_super) {
    __extends(BlockDiagnal, _super);
    function BlockDiagnal() {
        var _this = _super.call(this, "diagblock") || this;
        _this.moveVector = new Vec2(8, 10);
        _this.moveDuration = 0.1;
        _this.waitDuration = 0.2;
        _this.timePassed = 0;
        _this.going = false;
        _this.isMoving = false;
        _this.onTick = function () {
            if (_this.going) {
                _this.timePassed += Runtime.deltaTime;
                if (_this.isMoving) {
                    var fr = Runtime.deltaTime / _this.moveDuration;
                    _this.entity.transform = _this.entity.transform.add(_this.moveVector.multiplyScalar(fr));
                    if (_this.timePassed >= _this.moveDuration) {
                        _this.timePassed = 0;
                        _this.isMoving = false;
                    }
                }
                else {
                    if (_this.timePassed >= _this.waitDuration) {
                        _this.timePassed = 0;
                        _this.isMoving = true;
                    }
                }
            }
            if (_this.entity.transform.y > Constants.WORLD_MAX_Y - 20) {
                _this.entity.addTag("dead");
            }
        };
        _this.go = function () {
            _this.going = true;
            _this.isMoving = true;
        };
        return _this;
    }
    return BlockDiagnal;
}(BlockBaseController));

var BlockStair = /** @class */ (function (_super) {
    __extends(BlockStair, _super);
    function BlockStair() {
        var _this = _super.call(this, "stairblock") || this;
        _this.moveHori = new Vec2(13, 0);
        _this.moveVetic = new Vec2(0, -15);
        _this.moveDuration = 0.13;
        _this.timePassed = 0;
        _this.going = false;
        _this.goingTop = true;
        _this.onTick = function () {
            if (_this.going) {
                _this.timePassed += Runtime.deltaTime;
                if (_this.goingTop) {
                    var fr = Runtime.deltaTime / _this.moveDuration;
                    _this.entity.transform = _this.entity.transform.add(_this.moveHori.multiplyScalar(fr));
                    if (_this.timePassed >= _this.moveDuration) {
                        _this.timePassed = 0;
                        _this.goingTop = false;
                    }
                }
                else {
                    var fr = Runtime.deltaTime / _this.moveDuration;
                    _this.entity.transform = _this.entity.transform.add(_this.moveVetic.multiplyScalar(fr));
                    if (_this.timePassed >= _this.moveDuration) {
                        _this.timePassed = 0;
                        _this.goingTop = true;
                    }
                }
            }
            if (_this.entity.transform.y < Constants.WORLD_MIN_Y - 2) {
                _this.entity.addTag("dead");
            }
        };
        _this.go = function () {
            _this.going = true;
            _this.goingTop = true;
        };
        return _this;
    }
    return BlockStair;
}(BlockBaseController));

function BlockBuchTop(mgr) {
    var d = mgr.createEntity("blockBunchController");
    var controler = new BlockBunchController();
    controler.top = true;
    d.addComponent(controler);
}
function BlockBuchBottom(mgr) {
    var d = mgr.createEntity("blockBunchController");
    var controler = new BlockBunchController();
    controler.top = false;
    d.addComponent(controler);
}
function DiagnalBlock(mgr) {
    var _a;
    var d = mgr.createEntity();
    var sprite = new SpriteComponent((_a = Runtime.Media) === null || _a === void 0 ? void 0 : _a.getMedia("blockSprite"), 18, 18);
    sprite.applyPallet(Runtime.GlobalStorage.get(LevelInfo.PALLET));
    d.addComponent(sprite);
    var colider = new SquareColider(18, 18);
    d.addComponent(colider);
    var controler = new BlockDiagnal();
    d.addComponent(controler);
    var bcont = new BasicEnemyController();
    bcont.manageDeath = false;
    d.addComponent(bcont);
    return d;
}
function StairBlock(mgr) {
    var _a;
    var d = mgr.createEntity();
    var sprite = new SpriteComponent((_a = Runtime.Media) === null || _a === void 0 ? void 0 : _a.getMedia("blockSprite"), 18, 18);
    sprite.applyPallet(Runtime.GlobalStorage.get(LevelInfo.PALLET));
    d.addComponent(sprite);
    var colider = new SquareColider(18, 18);
    d.addComponent(colider);
    var controler = new BlockStair();
    d.addComponent(controler);
    var bcont = new BasicEnemyController();
    bcont.manageDeath = false;
    d.addComponent(bcont);
    return d;
}

var BulletController = /** @class */ (function (_super) {
    __extends(BulletController, _super);
    function BulletController(owner) {
        var _this = _super.call(this, "bulletcontroller") || this;
        _this.moveVector = new Vec2(250, 0);
        _this.damage = 1;
        _this.takeAmmo = true;
        _this.dieOnContact = true;
        _this.ownerType = "enemy";
        _this.onInit = function () {
        };
        _this.onTick = function () {
            var _a;
            _this.entity.transform = _this.entity.transform.add(_this.moveVector.multiplyScalar(Runtime.deltaTime));
            if (_this.entity.transform.x > ((_a = Runtime.Project) === null || _a === void 0 ? void 0 : _a.resolution.x) + 10 || _this.entity.transform.x < -10 || _this.entity.transform.y <= Constants.WORLD_MIN_Y || _this.entity.transform.y >= Constants.WORLD_MAX_Y) {
                if (_this.gun && _this.takeAmmo)
                    _this.gun.bulletsAlive--;
                _this.entity.deleteSelf();
            }
        };
        _this.onCollision = function (colider) {
            if (_this.dieOnContact) {
                if ((colider.entity.name == "player" && _this.ownerType == "enemy") || (colider.entity.hasTag("enemy") && _this.ownerType == "player")) {
                    if (_this.gun && _this.takeAmmo)
                        _this.gun.bulletsAlive--;
                    _this.entity.deleteSelf();
                }
            }
        };
        _this.gun = owner;
        return _this;
    }
    return BulletController;
}(ScriptComponent));

function EnemyBullet(mgr, owner) {
    var _a;
    var bullet = mgr.createEntity();
    bullet.addTag("enemy_bullet");
    var controller = new BulletController(owner);
    bullet.addComponent(controller);
    var sprite = new SpriteComponent((_a = Runtime.Media) === null || _a === void 0 ? void 0 : _a.getMedia("enemyBasicBullet"), 8, 6);
    sprite.applyPallet(Runtime.GlobalStorage.get(LevelInfo.PALLET));
    bullet.addComponent(sprite);
    var colider = new SquareColider(8, 6);
    bullet.addComponent(colider);
    return bullet;
}

var MovingDiskController = /** @class */ (function (_super) {
    __extends(MovingDiskController, _super);
    function MovingDiskController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //-140 0
        _this.moveVector = new Vec2(-Constants.WORLD_SPEED, 0);
        _this.canShoot = true;
        _this.ticks = 0;
        _this.onInit = function () {
            _this.sprite = _this.entity.getComponent(RendnerComponent.type);
        };
        _this.onTick = function () {
            _this.ticks++;
            if (_this.ticks % 5 == 0) {
                _this.sprite.frame++;
                if (_this.sprite.frame == 6) {
                    _this.sprite.frame = 0;
                }
            }
            _this.entity.transform = _this.entity.transform.add(_this.moveVector.multiplyScalar(Runtime.deltaTime));
            if (_this.canShoot) {
                _this.shoot();
            }
            _this.timePassed += Runtime.deltaTime;
        };
        _this.timePassed = 0;
        _this.breakTime = 0;
        _this.longBreak = Boolean(Math.round(Math.random()));
        return _this;
    }
    MovingDiskController.prototype.shoot = function () {
        var longBreak = 4 * randomNumberInRange(0.8, 1.1);
        var shortBreak = 1.5 * randomNumberInRange(0.8, 1.1);
        if (this.timePassed > this.breakTime) {
            var b = EnemyBullet(Runtime.EntityManager, undefined);
            b.transform = this.entity.transform.clone().add(new Vec2(3, 3));
            b.getComponent("bulletcontroller").moveVector = new Vec2(-180, 0);
            this.timePassed = 0;
            if (this.longBreak) {
                this.breakTime = longBreak;
            }
            else {
                this.breakTime = shortBreak;
            }
            this.longBreak = !this.longBreak;
        }
    };
    return MovingDiskController;
}(ScriptComponent));

var ShootingDiskController = /** @class */ (function (_super) {
    __extends(ShootingDiskController, _super);
    function ShootingDiskController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onInit = function () {
            _this.sprite = _this.entity.getComponent(RendnerComponent.type);
        };
        _this.onTick = function () {
            _this.timePassed += Runtime.deltaTime;
            _this.entity.transform = _this.entity.transform.add((new Vec2(-Constants.WORLD_SPEED, 0)).multiplyScalar(Runtime.deltaTime));
            _this.shoot();
        };
        _this.timePassed = 0;
        _this.breakTime = 0;
        _this.onCollision = function (colider) {
            if (colider.entity.hasTag("player_bullet")) {
                _this.sprite.frame++;
                if (_this.sprite.frame == 6) {
                    _this.sprite.frame = 0;
                }
            }
        };
        return _this;
    }
    ShootingDiskController.prototype.shoot = function () {
        var shortBreak = 4;
        if (this.timePassed > this.breakTime) {
            var b = EnemyBullet(Runtime.EntityManager, this.entity, Runtime.GlobalStorage.get(LevelInfo.PALLET));
            b.transform = this.entity.transform.clone().add(new Vec2(3, 3));
            b.getComponent("bulletcontroller").moveVector = new Vec2(-180, 0);
            this.timePassed = 0;
            this.breakTime = shortBreak;
        }
    };
    return ShootingDiskController;
}(ScriptComponent));

function StationaryDiskWall(mgr, itemsToDrop) {
    var _a;
    var timeOffsets = [0.6, 0.9, 1.2, 0.9, 0.6, 0.3];
    for (var i = 0; i < 6; i++) {
        var d = mgr.createEntity();
        d.transform.y = Constants.WORLD_MIN_Y + 14 + i * 24;
        d.transform.x = Constants.WORLD_MAX_X;
        var sprite = new SpriteComponent((_a = Runtime.Media) === null || _a === void 0 ? void 0 : _a.getMedia("diskSprite"), 18, 18);
        sprite.applyPallet(Runtime.GlobalStorage.get(LevelInfo.PALLET));
        d.addComponent(sprite);
        var colider = new SquareColider(18, 18);
        d.addComponent(colider);
        var controler = new ShootingDiskController();
        controler.breakTime = timeOffsets[i];
        d.addComponent(controler);
        var bcont = new BasicEnemyController();
        if (itemsToDrop) {
            var diff = 6 - itemsToDrop.length;
            if (diff + itemsToDrop.length > i) {
                bcont.itemToDrop = itemsToDrop[i - diff];
            }
        }
        d.addComponent(bcont);
    }
}
function MovingDiskWall(mgr, itemsToDrop) {
    var _a;
    for (var i = 0; i < 6; i++) {
        var d = mgr.createEntity();
        d.transform.y = Constants.WORLD_MIN_Y + 14 + i * 24;
        d.transform.x = Constants.WORLD_MAX_X;
        var sprite = new SpriteComponent((_a = Runtime.Media) === null || _a === void 0 ? void 0 : _a.getMedia("diskSprite"), 18, 18);
        sprite.applyPallet(Runtime.GlobalStorage.get(LevelInfo.PALLET));
        d.addComponent(sprite);
        var colider = new SquareColider(18, 18);
        d.addComponent(colider);
        var controler = new MovingDiskController();
        controler.moveVector = new Vec2(-150, 0).multiplyScalar(randomNumberInRange(0.4, 1.2));
        controler.canShoot = false;
        d.addComponent(controler);
        var bcont = new BasicEnemyController();
        if (itemsToDrop) {
            var diff = 6 - itemsToDrop.length;
            if (diff + itemsToDrop.length > i) {
                bcont.itemToDrop = itemsToDrop[i - diff];
            }
        }
        d.addComponent(bcont);
    }
}
function MovingDisk(mgr, yLevel, itemsToDrop) {
    var _a;
    var positions = [new Vec2(0, -16), new Vec2(16, 16), new Vec2(32, 0), new Vec2(48, 24), new Vec2(48, -24), new Vec2(64, 8)];
    for (var i = 0; i < positions.length; i++) {
        var d = mgr.createEntity();
        d.transform.y = yLevel;
        d.transform.x = Constants.WORLD_MAX_X;
        d.transform = d.transform.add(positions[i]);
        var sprite = new SpriteComponent((_a = Runtime.Media) === null || _a === void 0 ? void 0 : _a.getMedia("diskSprite"), 18, 18);
        sprite.applyPallet(Runtime.GlobalStorage.get(LevelInfo.PALLET));
        d.addComponent(sprite);
        var colider = new SquareColider(18, 18);
        d.addComponent(colider);
        var controler = new MovingDiskController();
        d.addComponent(controler);
        var bcont = new BasicEnemyController();
        if (itemsToDrop) {
            var diff = 6 - itemsToDrop.length;
            if (diff + itemsToDrop.length > i) {
                bcont.itemToDrop = itemsToDrop[i - diff];
            }
        }
        d.addComponent(bcont);
    }
}

var NormalSpikeController = /** @class */ (function (_super) {
    __extends(NormalSpikeController, _super);
    function NormalSpikeController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ticks = 0;
        _this.state = 0;
        _this.quickVector = new Vec2(-150, 0);
        _this.slowVector = new Vec2(-250, 0);
        _this.timeTillShoot = 1.6;
        _this.timeTillGo = 0.2;
        _this.timePassed = 0;
        _this.shot = false;
        _this.onInit = function () {
            _this.sprite = _this.entity.getComponent(RendnerComponent.type);
        };
        _this.onTick = function () {
            _this.timePassed += Runtime.deltaTime;
            _this.ticks++;
            if (_this.ticks % 3 == 0) {
                _this.sprite.frame++;
                if (_this.sprite.frame == 6) {
                    _this.sprite.frame = 0;
                }
            }
            switch (_this.state) {
                case 0:
                    _this.normalTick();
                    break;
                case 1:
                    _this.shootTick();
                    break;
                case 2:
                    _this.goTick();
                    break;
            }
        };
        return _this;
    }
    NormalSpikeController.prototype.normalTick = function () {
        this.entity.transform = this.entity.transform.add(this.quickVector.multiplyScalar(Runtime.deltaTime));
        if (Math.round(this.entity.transform.x) < Constants.WORLD_MAX_X - 20) {
            this.entity.transform.x = Constants.WORLD_MAX_X - 20;
            this.state = 1;
            this.timePassed = 0;
        }
    };
    NormalSpikeController.prototype.shootTick = function () {
        if (!this.shot && this.timePassed > this.timeTillShoot) {
            var b = EnemyBullet(Runtime.EntityManager, this.entity);
            b.transform = this.entity.transform.clone().add(new Vec2(3, 3));
            b.getComponent("bulletcontroller").moveVector = new Vec2(-180, 0);
            this.shot = true;
            this.timePassed = 0;
        }
        if (this.shot && this.timePassed > this.timeTillGo) {
            this.state = 2;
        }
    };
    NormalSpikeController.prototype.goTick = function () {
        this.entity.transform = this.entity.transform.add(this.slowVector.multiplyScalar(Runtime.deltaTime));
    };
    return NormalSpikeController;
}(ScriptComponent));

var MovingSpikeController = /** @class */ (function (_super) {
    __extends(MovingSpikeController, _super);
    function MovingSpikeController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ticks = 0;
        _this.quickVector = new Vec2(-96, 26);
        _this.onInit = function () {
            _this.sprite = _this.entity.getComponent(RendnerComponent.type);
        };
        _this.onTick = function () {
            _this.ticks++;
            if (_this.ticks % 3 == 0) {
                _this.sprite.frame++;
                if (_this.sprite.frame == 6) {
                    _this.sprite.frame = 0;
                }
            }
            _this.entity.transform = _this.entity.transform.add(_this.quickVector.multiplyScalar(Runtime.deltaTime));
        };
        return _this;
    }
    MovingSpikeController.prototype.shot = function () {
        var b = EnemyBullet(Runtime.EntityManager, undefined);
        b.transform = this.entity.transform.clone().add(new Vec2(3, 3));
        b.getComponent("bulletcontroller").moveVector = new Vec2(-100, 0);
    };
    return MovingSpikeController;
}(ScriptComponent));

function NormalSpike(mgr) {
    var _a;
    var offsetMap = [200, 120, 40, 0, 80, 160];
    for (var i = 0; i < 6; i++) {
        console.log("sumon");
        var d = mgr.createEntity();
        d.transform.y = Constants.WORLD_MIN_Y + 20 * i;
        d.transform.x = Constants.WORLD_MAX_X + offsetMap[i];
        var sprite = new SpriteComponent((_a = Runtime.Media) === null || _a === void 0 ? void 0 : _a.getMedia("spikeSprite"), 18, 18);
        sprite.applyPallet(Runtime.GlobalStorage.get(LevelInfo.PALLET));
        d.addComponent(sprite);
        var colider = new SquareColider(16, 16);
        d.addComponent(colider);
        var controler = new NormalSpikeController();
        d.addComponent(controler);
        var bcont = new BasicEnemyController();
        bcont.maxHealth = 4;
        d.addComponent(bcont);
    }
}
function MovingSpike(mgr, straight, itemsToDrop) {
    var _a;
    if (straight === void 0) { straight = true; }
    var offsetYTable = [0, 9, 30, 40, 60, 70];
    var offsetXTable = [0, 9, 40, 140, 140, 100];
    for (var i = 0; i < 6; i++) {
        var d = mgr.createEntity();
        //FIX OFFSET
        d.transform.y = Constants.WORLD_MIN_Y + 40 + offsetYTable[i];
        d.transform.x = Constants.WORLD_MAX_X + offsetXTable[i];
        var sprite = new SpriteComponent((_a = Runtime.Media) === null || _a === void 0 ? void 0 : _a.getMedia("spikeSprite"), 18, 18);
        sprite.applyPallet(Runtime.GlobalStorage.get(LevelInfo.PALLET));
        d.addComponent(sprite);
        var colider = new SquareColider(18, 18);
        d.addComponent(colider);
        var controler = new MovingSpikeController();
        if (straight)
            controler.quickVector = new Vec2(-240, 0);
        d.addComponent(controler);
        var bcont = new BasicEnemyController();
        if (itemsToDrop) {
            var diff = 6 - itemsToDrop.length;
            if (diff + itemsToDrop.length > i) {
                bcont.itemToDrop = itemsToDrop[i - diff];
            }
        }
        d.addComponent(bcont);
    }
}

var SquashingEnemyController = /** @class */ (function (_super) {
    __extends(SquashingEnemyController, _super);
    function SquashingEnemyController(path) {
        var _this = _super.call(this) || this;
        _this.ticks = 0;
        _this.pointAtPath = 0;
        _this.quickVector = new Vec2(200, 200);
        _this.onInit = function () {
            _this.sprite = _this.entity.getComponent(RendnerComponent.type);
        };
        _this.onTick = function () {
            _this.ticks++;
            if (_this.ticks % 5 == 0) {
                _this.sprite.frame++;
                if (_this.sprite.frame == 6) {
                    _this.sprite.frame = 0;
                }
            }
            var moveBy = _this.quickVector.multiplyScalar(Runtime.deltaTime);
            moveBy.x *= _this.path[_this.pointAtPath].direction.x;
            moveBy.y *= _this.path[_this.pointAtPath].direction.y;
            _this.entity.transform = _this.entity.transform.add(moveBy);
            if (_this.pointAtPath < _this.path.length - 1) {
                if (_this.path[_this.pointAtPath].direction.x == 1 || _this.path[_this.pointAtPath].direction.x == -1) {
                    if (_this.entity.transform.x <= _this.path[_this.pointAtPath].until.x) {
                        _this.entity.transform = _this.path[_this.pointAtPath].until;
                        _this.pointAtPath++;
                    }
                }
                else if (_this.path[_this.pointAtPath].direction.y == 1) {
                    if (_this.entity.transform.y >= _this.path[_this.pointAtPath].until.y) {
                        _this.entity.transform = _this.path[_this.pointAtPath].until;
                        _this.pointAtPath++;
                    }
                }
                else if (_this.path[_this.pointAtPath].direction.y == -1) {
                    if (_this.entity.transform.y <= _this.path[_this.pointAtPath].until.y) {
                        _this.entity.transform = _this.path[_this.pointAtPath].until;
                        _this.pointAtPath++;
                    }
                }
            }
        };
        _this.path = path;
        return _this;
    }
    SquashingEnemyController.prototype.shot = function () {
        var b = EnemyBullet(Runtime.EntityManager, this.entity);
        b.transform = this.entity.transform.clone().add(new Vec2(3, 3));
        b.getComponent("bulletcontroller").moveVector = new Vec2(-100, 0);
    };
    return SquashingEnemyController;
}(ScriptComponent));

var path = [
    { direction: new Vec2(-1, 0), until: new Vec2(140, 50) },
    { direction: new Vec2(0, 1), until: new Vec2(140, 100) },
    { direction: new Vec2(-1, 0), until: new Vec2(100, 100) },
    { direction: new Vec2(0, -1), until: new Vec2(100, 40) },
    { direction: new Vec2(-1, 0), until: new Vec2(0, 40) },
];
function SquashingBunch(mgr, yLevel) {
    for (var i = 0; i < 6; i++) {
        var e = Squashing(mgr, i);
        e.transform.x += 20 * i;
        e.transform.y = yLevel;
    }
}
function Squashing(mgr, ticks) {
    var _a;
    var d = mgr.createEntity();
    d.transform.x = Constants.WORLD_MAX_X;
    var sprite = new SpriteComponent((_a = Runtime.Media) === null || _a === void 0 ? void 0 : _a.getMedia("squashingSprite"), 16, 20);
    sprite.applyPallet(Runtime.GlobalStorage.get(LevelInfo.PALLET));
    sprite.frame = ticks;
    d.addComponent(sprite);
    var colider = new SquareColider(16, 16);
    d.addComponent(colider);
    var controler = new SquashingEnemyController(path);
    controler.ticks = ticks;
    d.addComponent(controler);
    var bcont = new BasicEnemyController();
    d.addComponent(bcont);
    return d;
}

var UfoController = /** @class */ (function (_super) {
    __extends(UfoController, _super);
    function UfoController(reverse) {
        var _this = _super.call(this) || this;
        _this.moveVector = new Vec2(-150, 0);
        _this.reverse = 1;
        _this.basicY = 0;
        _this.ticks = 0;
        _this.maxOffset = 50;
        _this.onInit = function () {
            _this.sprite = _this.entity.getComponent(RendnerComponent.type);
            _this.basicY = _this.entity.transform.y;
        };
        _this.onTick = function () {
            _this.ticks++;
            if (_this.ticks % 3 == 0) {
                _this.sprite.frame++;
                if (_this.sprite.frame == 6) {
                    _this.sprite.frame = 0;
                }
            }
            _this.entity.transform = _this.entity.transform.add(_this.moveVector.multiplyScalar(Runtime.deltaTime));
            var y = _this.basicY + Math.sin(Math.PI * (_this.entity.transform.x / 80)) * _this.maxOffset * _this.reverse;
            _this.entity.transform.y = y;
        };
        _this.reverse = reverse;
        return _this;
    }
    return UfoController;
}(ScriptComponent));

function Ufo(mgr, reverse, item) {
    var _a;
    var d = mgr.createEntity();
    var sprite = new SpriteComponent((_a = Runtime.Media) === null || _a === void 0 ? void 0 : _a.getMedia("ufoSprite"), 16, 20);
    sprite.applyPallet(Runtime.GlobalStorage.get(LevelInfo.PALLET));
    d.addComponent(sprite);
    var colider = new SquareColider(25, 25);
    d.addComponent(colider);
    var controler = new UfoController(reverse);
    d.addComponent(controler);
    var bcont = new BasicEnemyController();
    bcont.maxHealth = 1;
    bcont.itemToDrop = item;
    d.addComponent(bcont);
    return d;
}
function UfoBunch(mgr, itemsToDrop) {
    var _a, _b;
    var total = 0;
    for (var i = 0; i < 3; i++) {
        total++;
        var item = undefined;
        if (itemsToDrop) {
            var diff = 6 - itemsToDrop.length;
            if (diff + itemsToDrop.length > total) {
                item = itemsToDrop[total - diff];
            }
        }
        var e = Ufo(mgr, 1, item);
        e.transform.y = (((_a = Runtime.Project) === null || _a === void 0 ? void 0 : _a.resolution.y) / 2) + 10;
        e.transform.x = Constants.WORLD_MAX_X + 16 * i;
    }
    for (var i = 0; i < 3; i++) {
        total++;
        var item = undefined;
        if (itemsToDrop) {
            var diff = 6 - itemsToDrop.length;
            if (diff + itemsToDrop.length > total) {
                item = itemsToDrop[total - diff];
            }
        }
        var e = Ufo(mgr, -1, item);
        e.transform.y = (((_b = Runtime.Project) === null || _b === void 0 ? void 0 : _b.resolution.y) / 2) - 10;
        e.transform.x = Constants.WORLD_MAX_X + 16 * i;
    }
}
function Thin(mgr, reverse, maxOff) {
    var _a;
    var d = mgr.createEntity();
    var sprite = new SpriteComponent((_a = Runtime.Media) === null || _a === void 0 ? void 0 : _a.getMedia("thinSprite"), 16, 20);
    sprite.applyPallet(Runtime.GlobalStorage.get(LevelInfo.PALLET));
    d.addComponent(sprite);
    var colider = new SquareColider(16, 20);
    d.addComponent(colider);
    var controler = new UfoController(reverse);
    controler.maxOffset = maxOff;
    d.addComponent(controler);
    var bcont = new BasicEnemyController();
    bcont.maxHealth = 3;
    d.addComponent(bcont);
    return d;
}
function ThinBunch(mgr) {
    var _a;
    for (var i = 0; i < 6; i++) {
        var e = Thin(mgr, -1, 50);
        e.transform.y = (((_a = Runtime.Project) === null || _a === void 0 ? void 0 : _a.resolution.y) / 2);
        e.transform.x = Constants.WORLD_MAX_X + 16 * i;
    }
}

var AutoGun = /** @class */ (function (_super) {
    __extends(AutoGun, _super);
    function AutoGun(crateBullet) {
        var _this = _super.call(this, "gun") || this;
        _this.maxBullets = 0;
        _this.bulletVector = new Vec2(150, 0);
        _this.timeBetweenBullets = 0;
        _this.offset = new Vec2(3, 3);
        _this.shooting = false;
        _this.bulletsAlive = 0;
        _this.timePassed = 0;
        _this.onInit = function () {
        };
        _this.onTick = function () {
            _this.timePassed += Runtime.deltaTime;
            _this.shoot();
        };
        _this.createBullet = crateBullet;
        return _this;
    }
    AutoGun.prototype.shoot = function () {
        if (this.shooting) {
            if (this.timePassed > this.timeBetweenBullets) {
                var b = this.createBullet(Runtime.EntityManager, this, Runtime.GlobalStorage.get(LevelInfo.PALLET));
                b.transform = this.entity.absoluteTransform.add(new Vec2(0, 5));
                b.getComponent("bulletcontroller").moveVector = this.bulletVector.clone();
                this.bulletsAlive++;
                this.timePassed = 0;
            }
            if (this.bulletsAlive === this.maxBullets) {
                this.shooting = false;
                this.timePassed = 0;
            }
        }
        if (this.bulletsAlive === 0) {
            this.shooting = true;
            this.timePassed = this.timeBetweenBullets;
        }
    };
    return AutoGun;
}(ScriptComponent));

var WormBody = /** @class */ (function (_super) {
    __extends(WormBody, _super);
    function WormBody() {
        var _this = _super.call(this, "wromBody") || this;
        _this.timePassed = 0;
        _this.duration = 0.6;
        _this.onInit = function () {
        };
        _this.onTick = function () {
            _this.timePassed += Runtime.deltaTime;
            var t = (Math.round(_this.timePassed * 1000000) % (_this.duration * 1000000)) / 1000000;
            var angle = 2 * Math.PI * (t / _this.duration);
            _this.entity.transform.x = WormBody.maxOffset * Math.sin(angle);
        };
        return _this;
    }
    WormBody.maxOffset = 15;
    WormBody.duration = 0.45;
    return WormBody;
}(ScriptComponent));

var WormController = /** @class */ (function (_super) {
    __extends(WormController, _super);
    function WormController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bodyParts = [];
        _this.bodyControllers = [];
        _this.bodyPartsAlive = 6;
        _this.state = 0;
        _this.onInit = function () {
            _this.levelManager = Runtime.EntityManager.getEntity("levelmanager").getComponent("levelmanager");
            _this.levelManager.enemiesAlive++;
            var size = 6;
            var off = WormBody.duration / 4;
            for (var i = 0; i < size; i++) {
                var bodyPart = 1;
                if (i == 0)
                    bodyPart = 0;
                if (i == 5)
                    bodyPart = 2;
                var part = createWormBody(Runtime.EntityManager, bodyPart);
                var partController = part.getComponent("wromBody");
                var partBasicCont = part.getComponent("basicEnemyController");
                if (_this.itemsToDrop) {
                    var diff = 6 - _this.itemsToDrop.length;
                    if (diff + _this.itemsToDrop.length > i) {
                        partBasicCont.itemToDrop = _this.itemsToDrop[i - diff];
                    }
                }
                partController.enabled = false;
                partController.timePassed = off - Runtime.deltaTime;
                off += partController.duration / size / 2;
                partController.onTick();
                partController.enabled = false;
                part.transform.y += i * 16;
                part.transform.x += 4;
                _this.bodyParts.push(partController);
                _this.bodyControllers.push(partBasicCont);
                _this.entity.addChild(part);
            }
        };
        _this.onTick = function () {
            switch (_this.state) {
                case 0:
                    _this.entity.transform = _this.entity.transform.add((new Vec2(-Constants.WORLD_SPEED * 1.5, 0)).multiplyScalar(Runtime.deltaTime));
                    break;
                case 1:
                    _this.entity.transform = _this.entity.transform.add((new Vec2(-Constants.WORLD_SPEED / 3, 0)).multiplyScalar(Runtime.deltaTime));
                    break;
            }
            if (_this.entity.transform.x <= Constants.WORLD_MAX_X - 20) {
                for (var i = _this.bodyParts.length - 1; i >= 0; i--) {
                    _this.bodyParts[i].enabled = true;
                    _this.bodyControllers[i].enabled = true;
                }
                _this.state = 1;
            }
            for (var i = _this.bodyParts.length - 1; i >= 0; i--) {
                if (_this.bodyParts[i].entity.hasTag("dead")) {
                    _this.bodyPartsAlive--;
                    _this.bodyParts[i].entity.deleteSelf();
                    _this.bodyParts.splice(i, 1);
                }
            }
            if (_this.bodyPartsAlive == 0 || _this.entity.transform.x <= 0) {
                _this.levelManager.enemiesAlive--;
                for (var i = _this.bodyParts.length - 1; i >= 0; i--) {
                    _this.bodyParts[i].entity.deleteSelf();
                }
                _this.entity.deleteSelf();
            }
        };
        return _this;
    }
    return WormController;
}(ScriptComponent));

function createWormBody(mgr, bodyPart) {
    var _a;
    var d = mgr.createEntity();
    var sprite = new SpriteComponent((_a = Runtime.Media) === null || _a === void 0 ? void 0 : _a.getMedia("wormSprite"), 18, 20);
    sprite.applyPallet(Runtime.GlobalStorage.get(LevelInfo.PALLET));
    sprite.frame = bodyPart;
    d.addComponent(sprite);
    var colider = new SquareColider(18, 20);
    d.addComponent(colider);
    var controler = new WormBody();
    d.addComponent(controler);
    var gun = new AutoGun(function (mgr, owner) { return EnemyBullet(mgr, owner); });
    gun.maxBullets = 1;
    gun.bulletVector = new Vec2(-180, 0);
    d.addComponent(gun);
    var bcont = new BasicEnemyController();
    bcont.manageDeath = false;
    d.addComponent(bcont);
    return d;
}
function Worm(mgr, itemsToDrop) {
    var d = mgr.createEntity();
    d.transform.x = Constants.WORLD_MAX_X;
    d.transform.y = Constants.WORLD_MIN_Y + 20;
    var controler = new WormController();
    controler.itemsToDrop = itemsToDrop;
    d.addComponent(controler);
    return d;
}

function BasicBullet(mgr, owner) {
    var _a;
    var bullet = mgr.createEntity();
    bullet.addTag("player_bullet");
    var controller = new BulletController(owner);
    controller.ownerType = "player";
    controller.moveVector = new Vec2(-180, 0);
    bullet.addComponent(controller);
    var sprite = new SpriteComponent((_a = Runtime.Media) === null || _a === void 0 ? void 0 : _a.getMedia("player_bullet_basic"));
    sprite.applyPallet(Runtime.GlobalStorage.get(LevelInfo.PALLET));
    bullet.addComponent(sprite);
    var colider = new SquareColider(4, 4);
    bullet.addComponent(colider);
    return bullet;
}

var GunHudC = /** @class */ (function (_super) {
    __extends(GunHudC, _super);
    function GunHudC(gunManager) {
        var _this = _super.call(this) || this;
        _this.gunDisplays = [];
        _this.onInit = function () {
            _this.gunDisplays.forEach(function (g, index) {
                g.entity.transform.x = 70 + index * 40;
            });
        };
        _this.ticks = 0;
        _this.cmap = 0;
        _this.onTick = function () {
            _this.ticks++;
            for (var i = 0; i < _this.gMgr.enabledGuns.length; i++) {
                if (_this.gMgr.enabledGuns[i]) {
                    _this.gunDisplays[i].enabled = true;
                    if (i == _this.gMgr.selectedGun) {
                        if (_this.ticks % 5 == 0) {
                            var pal = undefined;
                            _this.cmap++;
                            _this.cmap = _this.cmap % 4;
                            switch (_this.cmap) {
                                case 0:
                                    pal = ColorPallets.BLUE;
                                    break;
                                case 1:
                                    pal = ColorPallets.GREEN;
                                    break;
                                case 2:
                                    pal = ColorPallets.PINK;
                                    break;
                                case 3:
                                    pal = ColorPallets.YELLOW;
                                    break;
                                default:
                                    pal = ColorPallets.RED;
                                    break;
                            }
                            _this.gunDisplays[i].applyPallet(pal);
                        }
                        _this.levelDisplay.frame = _this.gMgr.gunLevels[i] - 1;
                    }
                    else {
                        _this.gunDisplays[i].resetSprite();
                    }
                }
                else {
                    _this.gunDisplays[i].enabled = false;
                }
            }
        };
        _this.gMgr = gunManager;
        return _this;
    }
    return GunHudC;
}(ScriptComponent));
function GunHud(mgr, gmgr) {
    var _a, _b;
    var hud = mgr.createEntity("gunHud");
    var gHudControl = new GunHudC(gmgr);
    hud.addComponent(gHudControl);
    for (var i = 0; i < 4; i++) {
        var gd = mgr.createEntity();
        gd.transform.y = 1;
        var s = new SpriteComponent((_a = Runtime.Media) === null || _a === void 0 ? void 0 : _a.getMedia("hud_guns"), 22, 15);
        s.frame = i;
        s.enabled = false;
        gd.addComponent(s);
        gHudControl.gunDisplays.push(s);
    }
    var lvlD = mgr.createEntity("levelDisplay");
    var lvlS = new SpriteComponent((_b = Runtime.Media) === null || _b === void 0 ? void 0 : _b.getMedia("weapon_level"), 22, 15);
    lvlD.transform.y = 1;
    lvlD.transform.x = 30;
    lvlD.addComponent(lvlS);
    gHudControl.levelDisplay = lvlS;
}

var EwGun = /** @class */ (function (_super) {
    __extends(EwGun, _super);
    function EwGun() {
        var _this = _super.call(this, "ewgun") || this;
        _this.maxBullets = 1;
        _this.bulletVector = new Vec2(300, 0);
        _this.timeBetweenBullets = 0;
        _this.offset = new Vec2(3, 3);
        _this.shooting = false;
        _this.bulletsAlive = 0;
        _this.timePassed = 0;
        _this._level = 0;
        _this.maxLevel = 4;
        _this.onInit = function () {
        };
        _this.onTick = function () {
            _this.timePassed += Runtime.deltaTime;
            _this.shoot();
        };
        return _this;
    }
    Object.defineProperty(EwGun.prototype, "level", {
        get: function () {
            return this._level;
        },
        set: function (l) {
            if (l <= this.maxLevel)
                this._level = l;
        },
        enumerable: false,
        configurable: true
    });
    EwGun.prototype.shoot = function () {
        var shootVectors = [
            [new Vec2(0, 400), new Vec2(0, -400)],
            [new Vec2(0, 400), new Vec2(0, -400), new Vec2(400, 0), new Vec2(-400, 0)],
            [new Vec2(212, 212), new Vec2(212, -212), new Vec2(-212, 212), new Vec2(-212, -212), new Vec2(400, 0), new Vec2(-400, 0)],
            [new Vec2(212, 212), new Vec2(212, -212), new Vec2(-212, 212), new Vec2(-212, -212), new Vec2(0, 400), new Vec2(0, -400), new Vec2(400, 0), new Vec2(-400, 0)],
        ];
        if (this.shooting) {
            if (this.timePassed > this.timeBetweenBullets) {
                for (var i = 0; i < this._level * 2; i++) {
                    var c = this.createAddBullet();
                    c.moveVector = shootVectors[this._level - 1][i];
                    this.bulletsAlive++;
                }
                this.timePassed = 0;
            }
            if (this.bulletsAlive === this._level * 2) {
                this.shooting = false;
                this.timePassed = 0;
            }
        }
        if (this.bulletsAlive === 0) {
            this.shooting = true;
            this.timePassed = this.timeBetweenBullets;
        }
    };
    EwGun.prototype.createAddBullet = function () {
        var _a;
        var bullet = Runtime.EntityManager.createEntity();
        bullet.addTag("player_bullet");
        bullet.transform = this.entity.transform.clone();
        bullet.transform.x += 5;
        bullet.transform.y += 5;
        var controller = new BulletController(this);
        controller.ownerType = "player";
        bullet.addComponent(controller);
        controller.damage = 1;
        var sprite = new SpriteComponent((_a = Runtime.Media) === null || _a === void 0 ? void 0 : _a.getMedia("player_bullet_basic"), 6, 6, 8, 8);
        sprite.applyPallet(Runtime.GlobalStorage.get(LevelInfo.PALLET));
        bullet.addComponent(sprite);
        var colider = new SquareColider(6, 6);
        bullet.addComponent(colider);
        return controller;
    };
    return EwGun;
}(ScriptComponent));

var PulseGun = /** @class */ (function (_super) {
    __extends(PulseGun, _super);
    function PulseGun() {
        var _this = _super.call(this, "pgun") || this;
        _this.maxBullets = 1;
        _this.bulletVector = new Vec2(300, 0);
        _this.timeBetweenBullets = 0;
        _this.offset = new Vec2(3, 3);
        _this.shooting = false;
        _this.bulletsAlive = 0;
        _this.timePassed = 0;
        _this._level = 0;
        _this.maxLevel = 3;
        _this.onInit = function () {
        };
        _this.onTick = function () {
            _this.timePassed += Runtime.deltaTime;
            _this.shoot();
        };
        return _this;
    }
    Object.defineProperty(PulseGun.prototype, "level", {
        get: function () {
            return this._level;
        },
        set: function (l) {
            if (l <= this.maxLevel)
                this._level = l;
        },
        enumerable: false,
        configurable: true
    });
    PulseGun.prototype.shoot = function () {
        if (this.shooting) {
            if (this.timePassed > this.timeBetweenBullets) {
                if (this.level == 1) {
                    this.createShortBullet();
                }
                else {
                    this.createBullet();
                }
                if (this._level == 3) {
                    this.createAddBullet(1);
                    this.createAddBullet(-1);
                }
                this.bulletsAlive++;
                this.timePassed = 0;
            }
            if (this.bulletsAlive === this.maxBullets) {
                this.shooting = false;
                this.timePassed = 0;
            }
        }
        if (this.bulletsAlive === 0) {
            this.shooting = true;
            this.timePassed = this.timeBetweenBullets;
        }
    };
    PulseGun.prototype.createShortBullet = function () {
        var _a;
        var bullet = Runtime.EntityManager.createEntity();
        bullet.addTag("player_bullet");
        bullet.transform = this.entity.transform.clone();
        bullet.transform.x += 5;
        var controller = new BulletController(this);
        controller.moveVector = this.bulletVector.clone();
        bullet.addComponent(controller);
        controller.ownerType = "player";
        controller.damage = this._level;
        var sprite = new SpriteComponent((_a = Runtime.Media) === null || _a === void 0 ? void 0 : _a.getMedia("player_bullet_pulse_short"));
        sprite.applyPallet(Runtime.GlobalStorage.get(LevelInfo.PALLET));
        bullet.addComponent(sprite);
        var colider = new SquareColider(8, 14);
        bullet.addComponent(colider);
    };
    PulseGun.prototype.createBullet = function () {
        var _a;
        var bullet = Runtime.EntityManager.createEntity();
        bullet.addTag("player_bullet");
        bullet.transform = this.entity.transform.clone();
        bullet.transform.x += 5;
        bullet.transform.y -= 8;
        var controller = new BulletController(this);
        controller.ownerType = "player";
        controller.moveVector = this.bulletVector.clone();
        bullet.addComponent(controller);
        controller.damage = this._level;
        var sprite = new SpriteComponent((_a = Runtime.Media) === null || _a === void 0 ? void 0 : _a.getMedia("player_bullet_pulse"));
        sprite.applyPallet(Runtime.GlobalStorage.get(LevelInfo.PALLET));
        bullet.addComponent(sprite);
        var colider = new SquareColider(8, 32);
        bullet.addComponent(colider);
    };
    PulseGun.prototype.createAddBullet = function (dir) {
        var _a;
        var bullet = Runtime.EntityManager.createEntity();
        bullet.addTag("player_bullet");
        bullet.transform = this.entity.transform.clone();
        bullet.transform.x += 5;
        bullet.transform.y += 5;
        var controller = new BulletController(this);
        controller.moveVector = new Vec2(212, 212 * dir);
        controller.ownerType = "player";
        controller.takeAmmo = false;
        bullet.addComponent(controller);
        controller.damage = 1;
        var sprite = new SpriteComponent((_a = Runtime.Media) === null || _a === void 0 ? void 0 : _a.getMedia("player_bullet_basic"));
        sprite.applyPallet(Runtime.GlobalStorage.get(LevelInfo.PALLET));
        bullet.addComponent(sprite);
        var colider = new SquareColider(8, 8);
        bullet.addComponent(colider);
    };
    return PulseGun;
}(ScriptComponent));

var RailGun = /** @class */ (function (_super) {
    __extends(RailGun, _super);
    function RailGun() {
        var _this = _super.call(this, "rgun") || this;
        _this.maxBullets = 1;
        _this.bulletVector = new Vec2(200, 0);
        _this.timeBetweenBullets = 0;
        _this.offset = new Vec2(3, 3);
        _this.shooting = false;
        _this.bulletsAlive = 0;
        _this.timePassed = 0;
        _this._level = 0;
        _this.maxLevel = 4;
        _this.onInit = function () {
        };
        _this.onTick = function () {
            _this.timePassed += Runtime.deltaTime;
            _this.shoot();
        };
        return _this;
    }
    Object.defineProperty(RailGun.prototype, "level", {
        get: function () {
            return this._level;
        },
        set: function (l) {
            if (l <= this.maxLevel)
                this._level = l;
        },
        enumerable: false,
        configurable: true
    });
    RailGun.prototype.shoot = function () {
        if (this.shooting) {
            if (this.timePassed > this.timeBetweenBullets) {
                this.createBullet();
                this.bulletsAlive += this._level;
                this.timePassed = 0;
            }
            if (this.bulletsAlive === this._level) {
                this.shooting = false;
                this.timePassed = 0;
            }
        }
        if (this.bulletsAlive === 0) {
            this.shooting = true;
            this.timePassed = this.timeBetweenBullets;
        }
    };
    RailGun.prototype.createBullet = function () {
        var _a;
        for (var i = 0; i < this._level; i++) {
            var bullet = Runtime.EntityManager.createEntity();
            bullet.addTag("player_bullet");
            bullet.transform = this.entity.transform.clone();
            bullet.transform.x += i * 16 + 5;
            bullet.transform.y += 5;
            var controller = new BulletController(this);
            controller.moveVector = this.bulletVector.clone();
            controller.ownerType = "player";
            controller.dieOnContact = false;
            bullet.addComponent(controller);
            controller.damage = 2 * this._level;
            var sprite = new SpriteComponent((_a = Runtime.Media) === null || _a === void 0 ? void 0 : _a.getMedia("player_bullet_railgun"));
            sprite.applyPallet(Runtime.GlobalStorage.get(LevelInfo.PALLET));
            bullet.addComponent(sprite);
            var colider = new SquareColider(16, 8);
            bullet.addComponent(colider);
        }
    };
    return RailGun;
}(ScriptComponent));

var GunManager = /** @class */ (function (_super) {
    __extends(GunManager, _super);
    function GunManager() {
        var _this = _super.call(this, "gunmanager") || this;
        _this.gunLevels = [1, 0, 0, 0];
        _this.selectedGun = 0;
        _this.gunArr = [];
        _this.enabledGuns = [true, false, false, false];
        _this.gunchanged = false;
        _this.onInit = function () {
            //createGuns
            var bg = new AutoGun(function (mgr) { return _this.basicBullet(mgr); });
            _this.entity.addComponent(bg);
            bg.bulletVector = new Vec2(450, 0);
            bg.maxBullets = 3;
            bg.timeBetweenBullets = 0.1;
            _this.basicGun = bg;
            bg.enabled = true;
            _this.gunArr.push(_this.basicGun);
            _this.basicGunUp();
            //railgun
            var railg = new RailGun();
            _this.entity.addComponent(railg);
            _this.railGun = railg;
            railg.enabled = false;
            _this.gunArr.push(_this.railGun);
            //pulsegun
            var pulseg = new PulseGun();
            _this.entity.addComponent(pulseg);
            _this.pulseGun = pulseg;
            pulseg.enabled = false;
            _this.gunArr.push(_this.pulseGun);
            //8waygun
            var ewg = new EwGun();
            _this.entity.addComponent(ewg);
            _this.ewGun = ewg;
            ewg.enabled = false;
            _this.gunArr.push(_this.ewGun);
            //HUD
            GunHud(Runtime.EntityManager, _this);
        };
        _this.onTick = function () {
            var _a;
            if (Runtime.Input.enter && !_this.gunchanged) {
                var prevIndex = _this.selectedGun;
                var prevBullets = _this.gunArr[_this.selectedGun].bulletsAlive;
                _this.gunArr[_this.selectedGun].enabled = false;
                _this.gunArr[_this.selectedGun].bulletsAlive = 0;
                do {
                    _this.selectedGun++;
                    _this.selectedGun = _this.selectedGun % _this.gunArr.length;
                } while (!_this.enabledGuns[_this.selectedGun]);
                _this.gunArr[_this.selectedGun].enabled = true;
                if (_this.selectedGun == 0) {
                    _this.basicGun.enabled = true;
                }
                _this.gunchanged = true;
                if (_this.selectedGun != prevIndex) {
                    (_a = Runtime.EntityManager) === null || _a === void 0 ? void 0 : _a.getEntitesByTag("player_bullet").forEach(function (e) { return e.deleteSelf(); });
                }
                else {
                    _this.gunArr[_this.selectedGun].bulletsAlive = prevBullets;
                }
            }
            else if (!Runtime.Input.enter) {
                _this.gunchanged = false;
            }
        };
        _this.onCollision = function (colider) {
            var e = colider.entity;
            if (e.hasTag("item")) {
                if (e.hasTag(Items.BASIC_GUN)) {
                    _this.gunLevels[0] = _this.gunLevels[0] < 4 ? _this.gunLevels[0] + 1 : _this.gunLevels[0];
                    _this.basicGunUp();
                }
                else if (e.hasTag(Items.EWAY_GUN)) {
                    if (!_this.enabledGuns[3])
                        _this.enabledGuns[3] = true;
                    _this.ewGun.level = _this.ewGun.level + 1;
                    _this.gunLevels[3] = _this.ewGun.level;
                }
                else if (e.hasTag(Items.RAIL_GUN)) {
                    if (!_this.enabledGuns[1])
                        _this.enabledGuns[1] = true;
                    _this.railGun.level = _this.railGun.level + 1;
                    _this.gunLevels[1] = _this.railGun.level;
                }
                else if (e.hasTag(Items.PULS_GUN)) {
                    if (!_this.enabledGuns[2])
                        _this.enabledGuns[2] = true;
                    _this.pulseGun.level = _this.pulseGun.level + 1;
                    _this.gunLevels[2] = _this.pulseGun.level;
                }
            }
        };
        return _this;
    }
    GunManager.prototype.disable = function () {
        this.gunArr[this.selectedGun].enabled = false;
        this.enabled = false;
    };
    GunManager.prototype.degradeGun = function () {
        this.gunLevels[this.selectedGun]--;
        if (this.gunLevels[this.selectedGun] == 0) {
            if (this.selectedGun == 0)
                this.gunLevels[this.selectedGun] = 1;
            else {
                this.enabledGuns[this.selectedGun] = false;
                this.gunArr[this.selectedGun].enabled = false;
                this.gunArr[this.selectedGun].bulletsAlive = 0;
                do {
                    this.selectedGun++;
                    this.selectedGun = this.selectedGun % this.gunArr.length;
                } while (!this.enabledGuns[this.selectedGun]);
                this.gunArr[this.selectedGun].enabled = true;
            }
        }
        this.basicGunUp();
    };
    GunManager.prototype.basicBullet = function (mgr) {
        var b = BasicBullet(Runtime.EntityManager, this.basicGun);
        return b;
    };
    GunManager.prototype.basicGunUp = function () {
        switch (this.gunLevels[0]) {
            case 1:
                this.basicGun.maxBullets = 3;
                this.basicGun.timeBetweenBullets = 0.1;
                break;
            case 2:
                this.basicGun.maxBullets = 4;
                this.basicGun.timeBetweenBullets = 0.1;
                break;
            case 3:
                this.basicGun.maxBullets = 5;
                this.basicGun.timeBetweenBullets = 0.05;
                break;
            case 4:
                this.basicGun.maxBullets = 12;
                this.basicGun.timeBetweenBullets = 0.02;
                break;
        }
    };
    return GunManager;
}(ScriptComponent));

var StatsREnder = /** @class */ (function (_super) {
    __extends(StatsREnder, _super);
    function StatsREnder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onInit = function () {
            var _a, _b;
            _this.player = (_b = (_a = Runtime.EntityManager) === null || _a === void 0 ? void 0 : _a.getEntity("player")) === null || _b === void 0 ? void 0 : _b.getComponent("player_contoler");
            _this.gunManager = _this.player.entity.getComponent("gunmanager");
        };
        _this.weaponNames = ["Orbit", "Rail", "Pulse", "8 Way"];
        _this.onTick = function (context) {
            var _a;
            context.fillStyle = "white";
            context.font = "10px 8 Bit Wonder";
            context.fillText("P1   " + _this.formatScore(_this.player.score) + "   Lives " + ((_a = _this.player) === null || _a === void 0 ? void 0 : _a.lives) + "    " + _this.weaponNames[_this.gunManager.selectedGun], _this.entity.absoluteTransform.x, _this.entity.absoluteTransform.y);
        };
        return _this;
    }
    StatsREnder.prototype.formatScore = function (score) {
        var finalD = 6;
        var digits = score == 0 ? 1 : Math.floor(Math.log10(score) + 1);
        var fText = "";
        for (var i = 0; i < finalD - digits; i++) {
            fText += "0";
        }
        return fText + score;
    };
    return StatsREnder;
}(RendnerComponent));
function Stats(mgr) {
    var e = mgr.createEntity("stats_display");
    e.transform.y = Constants.WORLD_MAX_Y + 10;
    e.transform.x = 10;
    var r = new StatsREnder();
    e.addComponent(r);
}

var PlayerControler = /** @class */ (function (_super) {
    __extends(PlayerControler, _super);
    function PlayerControler() {
        var _this = _super.call(this, "player_contoler") || this;
        _this.timePassed = 0;
        _this.ticks = 0;
        _this.deathWait = 0.8;
        _this.isDead = false;
        _this.currentAnim = 0;
        _this.animTicks = 0;
        _this.lives = 3;
        _this.score = 0;
        _this.state = 0;
        _this.invurneable = true;
        _this.cmap = 0;
        _this.onInit = function () {
            _this.sprite = _this.entity.getComponent(RendnerComponent.type);
            _this.colider = _this.entity.getComponent(Colider.type);
            _this.gunManager = _this.entity.getComponent("gunmanager");
            _this.entity.transform = new Vec2(-60, Constants.WORLD_MIN_Y + 60);
            Stats(Runtime.EntityManager);
        };
        _this.onTick = function () {
            var _a, _b;
            _this.timePassed += Runtime.deltaTime;
            _this.ticks++;
            if (_this.isDead && _this.timePassed >= _this.deathWait) {
                _this.isDead = false;
                _this.timePassed = 0;
            }
            if (!_this.isDead && _this.timePassed >= 4.5) {
                _this.invurneable = false;
                _this.colider.enabled = true;
                (_a = _this.sprite) === null || _a === void 0 ? void 0 : _a.applyPallet(ColorPallets.RED);
                _this.cmap = 0;
            }
            if (_this.invurneable && _this.ticks % 3 == 0) {
                var pal = undefined;
                _this.cmap++;
                _this.cmap = _this.cmap % 4;
                switch (_this.cmap) {
                    case 0:
                        pal = ColorPallets.BLUE;
                        break;
                    case 1:
                        pal = ColorPallets.GREEN;
                        break;
                    case 2:
                        pal = ColorPallets.PINK;
                        break;
                    case 3:
                        pal = ColorPallets.YELLOW;
                        break;
                    default:
                        pal = ColorPallets.RED;
                        break;
                }
                (_b = _this.sprite) === null || _b === void 0 ? void 0 : _b.applyPallet(pal);
            }
            if (!_this.isDead) {
                switch (_this.state) {
                    case 0:
                        _this.comeInTic();
                        break;
                    case 1:
                        _this.normalTick();
                        break;
                    case 2:
                        _this.moveToPoint();
                        break;
                }
            }
        };
        _this.animFrame = 0;
        _this.animFrameForward = 0;
        _this.onCollision = function (colider) {
            if (_this.state < 2) {
                if ((colider.entity.hasTag("enemy_bullet") || colider.entity.hasTag("enemy") || colider.entity.name == "world") && !_this.invurneable) {
                    _this.die();
                }
                if (colider.entity.hasTag("item") && colider.entity.hasTag(Items.HP)) {
                    _this.lives = _this.lives < 5 ? _this.lives + 1 : _this.lives;
                }
            }
        };
        return _this;
    }
    PlayerControler.prototype.moveToPoint = function () {
        var _a;
        if (!this.helpVec) {
            this.helpVec = (new Vec2(160, 60)).add(this.entity.transform.opposite());
            if (this.helpVec.magnitude > 10)
                this.helpVec = this.helpVec.multiplyScalar(0.3);
            (_a = this.gunManager) === null || _a === void 0 ? void 0 : _a.disable();
            this.sprite.frame = 0;
            Runtime.GlobalStorage.set("currentScore", this.score);
        }
        if (!(this.entity.transform.x > 158 && this.entity.transform.x < 162 && this.entity.transform.y < 62 && this.entity.transform.y > 58)) {
            this.entity.transform = this.entity.transform.add(this.helpVec.multiplyScalar(Runtime.deltaTime));
        }
        else {
            //waiting for ship
            this.state = 3;
        }
    };
    PlayerControler.prototype.comeInTic = function () {
        this.entity.transform = this.entity.transform.add(new Vec2(120, 0).multiplyScalar(Runtime.deltaTime));
        if (this.entity.transform.x >= 80) {
            this.state = 1;
        }
    };
    PlayerControler.prototype.normalTick = function () {
        this.currentAnim = 0;
        if (Runtime.Input.up) {
            if (this.entity.transform.y > Constants.WORLD_MIN_Y + 15) {
                this.entity.transform.y -= 3;
            }
            this.currentAnim = 1;
        }
        if (Runtime.Input.down) {
            if (this.entity.transform.y < Constants.WORLD_MAX_Y - Constants.PLAYER_SIZE.y - 15) {
                this.entity.transform.y += 3;
            }
            this.currentAnim = 2;
        }
        if (Runtime.Input.left) {
            if (this.entity.transform.x > 0) {
                this.entity.transform.x -= 3;
            }
            this.currentAnim = 3;
        }
        if (Runtime.Input.right) {
            if (this.entity.transform.x < Constants.WORLD_MAX_X - Constants.PLAYER_SIZE.x) {
                this.entity.transform.x += 3;
            }
            this.currentAnim = 4;
        }
        if ((Runtime.Input.left && Runtime.Input.right) || (Runtime.Input.up && Runtime.Input.down)) {
            this.currentAnim = 0;
        }
        this.timePassed += Runtime.deltaTime;
        this.animTicks++;
        switch (this.currentAnim) {
            case 0:
                this.playNormalAnim();
                break;
            case 1:
                this.playAnimUp();
                break;
            case 2:
                this.playAnimDown();
                break;
            case 3:
                this.playAnimLeft();
                break;
            case 4:
                this.playAnimForward();
                break;
        }
    };
    PlayerControler.prototype.playNormalAnim = function () {
        if (this.animTicks % 3 == 0) {
            this.sprite.frame = this.sprite.frame == 1 ? 0 : 1;
        }
    };
    PlayerControler.prototype.playAnimUp = function () {
        if (this.animTicks % 3 == 0) {
            this.animFrame = this.animFrame >= 4 ? 0 : this.animFrame + 1;
            this.sprite.frame = 2 + this.animFrame - 1;
        }
    };
    PlayerControler.prototype.playAnimDown = function () {
        this.sprite.frame = 11;
    };
    PlayerControler.prototype.playAnimLeft = function () {
        if (this.animTicks % 3 == 0) {
            this.sprite.frame = this.sprite.frame == 11 ? 10 : 11;
        }
    };
    PlayerControler.prototype.playAnimForward = function () {
        if (this.sprite.frame < 6 || this.sprite.frame > 10) {
            this.animFrame = 0;
        }
        if (this.animTicks % 3 == 0) {
            this.sprite.frame = 6 + this.animFrame;
            this.animFrame++;
            if (this.animFrame == 4) {
                this.animFrame = 2;
            }
        }
    };
    PlayerControler.prototype.die = function () {
        var _a;
        var e = Explosion(Runtime.EntityManager);
        e.transform = this.entity.transform.clone();
        this.state = 0;
        this.entity.transform.x = -16;
        this.invurneable = true;
        this.timePassed = 0;
        this.isDead = true;
        this.colider.enabled = false;
        this.sprite.frame = 0;
        this.lives--;
        this.gunManager.degradeGun();
        //summon exposion
        if (this.lives == 0) {
            Runtime.GlobalStorage.set("currentScore", this.score);
            (_a = Runtime.SceneManager) === null || _a === void 0 ? void 0 : _a.setScene("game_over");
        }
    };
    return PlayerControler;
}(ScriptComponent));

function Player(mgr) {
    var _a;
    var player = mgr.createEntity("player");
    player.transform.y = 80;
    var playerScript = new PlayerControler();
    player.addComponent(playerScript);
    var playerSprite = new SpriteComponent((_a = Runtime.Media) === null || _a === void 0 ? void 0 : _a.getMedia("player_sprite"), 16, 18);
    playerSprite.applyPallet(ColorPallets.RED);
    player.addComponent(playerSprite);
    var playerColider = new SquareColider(16, 18);
    player.addComponent(playerColider);
    var gunManager = new GunManager();
    player.addComponent(gunManager);
    return playerScript;
}

var SpaceShipController = /** @class */ (function (_super) {
    __extends(SpaceShipController, _super);
    function SpaceShipController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onInit = function () {
            _this.levelManager = Runtime.EntityManager.getEntity("levelmanager").getComponent("levelmanager");
            _this.player = Runtime.EntityManager.getEntity("player");
        };
        _this.onTick = function () {
            var _a;
            _this.entity.transform = _this.entity.transform.add((new Vec2(60, 0)).multiplyScalar(Runtime.deltaTime));
            if (_this.entity.transform.x > 150) {
                _this.player.transform = _this.player.transform.add((new Vec2(60, 0)).multiplyScalar(Runtime.deltaTime));
            }
            if (_this.entity.transform.x > Constants.WORLD_MAX_X + 30) {
                (_a = Runtime.SceneManager) === null || _a === void 0 ? void 0 : _a.setScene("show_score");
            }
        };
        return _this;
    }
    return SpaceShipController;
}(ScriptComponent));
function SpaceShip(mgr) {
    var _a;
    var e = mgr.createEntity();
    var controler = new SpaceShipController();
    e.addComponent(controler);
    e.transform = new Vec2(-25, Constants.WORLD_MIN_Y + 25);
    var sprite = new SpriteComponent((_a = Runtime.Media) === null || _a === void 0 ? void 0 : _a.getMedia("space_ship"));
    e.addComponent(sprite);
    return controler;
}

var WorldMain = /** @class */ (function (_super) {
    __extends(WorldMain, _super);
    function WorldMain() {
        var _this = _super.call(this, "worldmain") || this;
        _this.moveing = true;
        _this.onInit = function () {
            var _a;
            _this.entity.transform.x = Constants.WORLD_MAX_X + 40;
            _this.img = (_a = Runtime.Media) === null || _a === void 0 ? void 0 : _a.getMedia(Runtime.GlobalStorage.get(LevelInfo.MAP_ID));
            _this.colider = _this.entity.getComponent(Colider.type);
        };
        _this.onTick = function () {
            var _a;
            if ((_a = _this.colider) === null || _a === void 0 ? void 0 : _a.ready) {
                if (_this.moveing && _this.entity.transform.x + _this.img.width <= Constants.WORLD_MAX_X) {
                    _this.moveing = false;
                    _this.entity.transform.x = Constants.WORLD_MAX_X - _this.img.width;
                }
                if (_this.moveing) {
                    _this.entity.transform.x -= Constants.WORLD_SPEED * Runtime.deltaTime;
                }
            }
        };
        return _this;
    }
    return WorldMain;
}(ScriptComponent));

var WorldColider = /** @class */ (function (_super) {
    __extends(WorldColider, _super);
    function WorldColider() {
        var _this = _super.call(this) || this;
        _this._world = [];
        _this.ready = false;
        _this.onInit = function () {
            var _a;
            var img = (_a = Runtime.Media) === null || _a === void 0 ? void 0 : _a.getMedia(Runtime.GlobalStorage.get(LevelInfo.MAP_ID));
            var can = document.createElement("canvas");
            can.height = img.height;
            can.width = img.width;
            var ctx = can.getContext("2d");
            if (ctx) {
                ctx.drawImage(img, 0, 0);
                var imgData = ctx.getImageData(0, 0, img.width, img.height);
                var blockSize = 8;
                var maxX = img.width / blockSize;
                var maxY = img.height / blockSize;
                for (var x = 0; x < maxX; x++) {
                    _this._world[x] = [];
                    for (var z = 0; z < maxY; z++) {
                        _this._world[x][z] = 0;
                    }
                }
                var tmp = [];
                for (var x = 0; x < img.width; x++) {
                    tmp[x] = [];
                    for (var z = 0; z < img.height; z++) {
                        tmp[x][z] = 0;
                    }
                }
                var iter = 0;
                for (var i = 0; i < imgData.data.length; i += 4) {
                    var value = imgData.data[i + 3];
                    var x = Math.floor(iter / img.width);
                    var y = iter % img.width;
                    tmp[y][x] = value;
                    iter++;
                }
                for (var x = 0; x < maxX; x++) {
                    for (var y = 0; y < maxY; y++) {
                        var sum = 0;
                        for (var i = 0; i < blockSize; i++) {
                            for (var j = 0; j < blockSize; j++) {
                                sum += tmp[x * blockSize + i][y * blockSize + j];
                            }
                        }
                        if (sum > 6528) {
                            _this._world[x][y] = 1;
                            ctx.fillStyle = "red";
                            ctx.fillRect(x * 8, y * 8, 8, 8);
                        }
                        else {
                            _this._world[x][y] = 0;
                        }
                    }
                }
                _this.ready = true;
                //console.log(can.toDataURL())
            }
        };
        _this.isOverlapping = function (colider) {
            var cellScreenSize = 8;
            var x = Math.floor((colider.x - _this.entity.absoluteTransform.x) / cellScreenSize);
            var x1 = Math.floor((colider.x1 - _this.entity.absoluteTransform.x) / cellScreenSize);
            var y = Math.floor((colider.y - _this.entity.absoluteTransform.y) / cellScreenSize);
            var y1 = Math.floor((colider.y1 - _this.entity.absoluteTransform.y) / cellScreenSize);
            if (x > 0 && y > 0 && x < _this._world.length && y < _this._world[x].length && _this._world[x][y] == 1)
                return true;
            if (x1 > 0 && y > 0 && x1 < _this._world.length && y < _this._world[x1].length && _this._world[x1][y] == 1)
                return true;
            if (x > 0 && y1 > 0 && x < _this._world.length && y1 < _this._world[x].length && _this._world[x][y1] == 1)
                return true;
            if (x1 > 0 && y1 > 0 && x1 < _this._world.length && y1 < _this._world[x1].length && _this._world[x1][y1] == 1)
                return true;
            return false;
        };
        _this.initialized = false;
        return _this;
    }
    return WorldColider;
}(Colider));

function World(mgr) {
    var _a;
    var world = mgr.createEntity("world");
    world.transform.y = Constants.WORLD_MIN_Y;
    var worldScript = new WorldMain();
    world.addComponent(worldScript);
    var worldRender = new SpriteComponent((_a = Runtime.Media) === null || _a === void 0 ? void 0 : _a.getMedia("level1"));
    worldRender.applyPallet(Runtime.GlobalStorage.get(LevelInfo.PALLET));
    world.addComponent(worldRender);
    var worldColider = new WorldColider();
    world.addComponent(worldColider);
    return worldColider;
}

var Levels = [
    {
        enemies: [
            { type: 0, yLevel: 60, dropItems: [Items.BASIC_GUN, Items.BASIC_GUN, Items.RAIL_GUN] },
            { type: 0, yLevel: 100 }, { type: 1 },
            { type: 1 },
            { type: 3, yLevel: 50, dropItems: [Items.HP, Items.HP, Items.HP] }, { type: 1 },
            { type: 0, yLevel: 50, dropItems: [Items.HP, Items.HP, Items.RAIL_GUN] },
            { type: 5, yLevel: 50 },
            { type: 5, yLevel: 50, dropItems: [Items.HP, Items.HP] },
            { type: 4, yLevel: 50 },
            { type: 2 },
            { type: 0, dropItems: [Items.EWAY_GUN, Items.BASIC_GUN, Items.PULS_GUN] },
            { type: 8 },
            { type: 2 },
            { type: 7, dropItems: [Items.EWAY_GUN, Items.BASIC_GUN, Items.PULS_GUN] },
            { type: 3 },
            { type: 0, yLevel: 50, dropItems: [Items.HP, Items.EWAY_GUN, Items.RAIL_GUN] },
            { type: 1 },
            { type: 9 },
            { type: 10 },
        ],
        levelMapId: "level1",
        colorPallet: ColorPallets.GREEN
    }
];

var LevelManagerController = /** @class */ (function (_super) {
    __extends(LevelManagerController, _super);
    function LevelManagerController() {
        var _this = _super.call(this, "levelmanager") || this;
        _this.curentLevel = Levels[0];
        _this.enemyProgress = 0;
        _this.enemiesAlive = 0;
        _this.state = 0;
        _this.onInit = function () {
            Runtime.GlobalStorage.set("colorPallet", _this.curentLevel.colorPallet);
            Runtime.GlobalStorage.set("levelMapId", _this.curentLevel.levelMapId);
            _this.colider = World(Runtime.EntityManager);
        };
        _this.onTick = function () {
            var _a;
            if (((_a = _this.colider) === null || _a === void 0 ? void 0 : _a.ready) && _this.player == undefined) {
                _this.player = Player(Runtime.EntityManager);
            }
            if (_this.player) {
                if (_this.enemiesAlive == 0 && _this.state == 0) {
                    _this.summonNextEnemy();
                }
                if (_this.state == 1) {
                    _this.player.state = 2;
                    _this.state = 2;
                }
                if (_this.player.state == 3 && _this.state == 2) {
                    SpaceShip(Runtime.EntityManager);
                    _this.state = 3;
                }
            }
        };
        return _this;
    }
    LevelManagerController.prototype.summonNextEnemy = function () {
        if (this.enemyProgress < this.curentLevel.enemies.length) {
            console.log("Summoning: " + this.enemyProgress);
            switch (this.curentLevel.enemies[this.enemyProgress].type) {
                case 0:
                    MovingDisk(Runtime.EntityManager, this.curentLevel.enemies[this.enemyProgress].yLevel, this.curentLevel.enemies[this.enemyProgress].dropItems);
                    break;
                case 1:
                    StationaryDiskWall(Runtime.EntityManager, this.curentLevel.enemies[this.enemyProgress].dropItems);
                    break;
                case 2:
                    MovingDiskWall(Runtime.EntityManager, this.curentLevel.enemies[this.enemyProgress].dropItems);
                    break;
                case 3:
                    NormalSpike(Runtime.EntityManager);
                    break;
                case 4:
                    MovingSpike(Runtime.EntityManager, true, this.curentLevel.enemies[this.enemyProgress].dropItems);
                    break;
                case 5:
                    Worm(Runtime.EntityManager, this.curentLevel.enemies[this.enemyProgress].dropItems);
                    break;
                case 6:
                    SquashingBunch(Runtime.EntityManager, this.curentLevel.enemies[this.enemyProgress].yLevel);
                    break;
                case 7:
                    UfoBunch(Runtime.EntityManager, this.curentLevel.enemies[this.enemyProgress].dropItems);
                    break;
                case 8:
                    ThinBunch(Runtime.EntityManager);
                    break;
                case 9:
                    BlockBuchTop(Runtime.EntityManager);
                    break;
                case 10:
                    BlockBuchBottom(Runtime.EntityManager);
            }
            this.enemyProgress++;
        }
        else {
            this.state = 1;
        }
    };
    return LevelManagerController;
}(ScriptComponent));
function LevelManager(mgr) {
    var m = mgr.createEntity("levelmanager");
    var c = new LevelManagerController();
    m.addComponent(c);
}
var LevelInfo;
(function (LevelInfo) {
    LevelInfo["PALLET"] = "colorPallet";
    LevelInfo["MAP_ID"] = "levelMapId";
})(LevelInfo || (LevelInfo = {}));

function MainMenu(mgr) {
    var _a;
    var e = mgr.createEntity();
    var sprite = new SpriteComponent((_a = Runtime.Media) === null || _a === void 0 ? void 0 : _a.getMedia("main_menu"), 336, 224);
    e.addComponent(sprite);
    var controller = new MainMEnuController();
    e.addComponent(controller);
}
var MainMEnuController = /** @class */ (function (_super) {
    __extends(MainMEnuController, _super);
    function MainMEnuController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.timePassed = 0;
        _this.ticks = 0;
        _this.keyDown = true;
        _this.onInit = function () {
            _this.sprite = _this.entity.getComponent(RendnerComponent.type);
            if (!Runtime.GlobalStorage.has("scores"))
                Runtime.GlobalStorage.set("scores", [{ name: "---", score: 0 }, { name: "---", score: 0 }, { name: "---", score: 0 }, { name: "---", score: 0 }, { name: "---", score: 0 }, { name: "---", score: 0 }]);
        };
        _this.onTick = function () {
            var _a, _b;
            _this.ticks++;
            _this.timePassed += Runtime.deltaTime;
            if (_this.ticks % 2 == 0) {
                _this.sprite.frame = (_this.sprite.frame + 1) % 5;
            }
            if (!Runtime.Input.enter)
                _this.keyDown = false;
            if (_this.timePassed > 10) {
                (_a = Runtime.SceneManager) === null || _a === void 0 ? void 0 : _a.setScene("hall_of_fame");
            }
            if (Runtime.Input.enter && !_this.keyDown) {
                (_b = Runtime.SceneManager) === null || _b === void 0 ? void 0 : _b.setScene("wait_for_level");
            }
        };
        return _this;
    }
    return MainMEnuController;
}(ScriptComponent));

function ShowScore(mgr) {
    var _a;
    var e = mgr.createEntity();
    var sprite = new DrawableSprite((_a = Runtime.Media) === null || _a === void 0 ? void 0 : _a.getMedia("show_score"), 336, 224);
    e.addComponent(sprite);
    var controller = new ShowScoreC();
    e.addComponent(controller);
}
var ShowScoreC = /** @class */ (function (_super) {
    __extends(ShowScoreC, _super);
    function ShowScoreC() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.timePassed = 0;
        _this.ticks = 0;
        _this.keyDown = true;
        _this.onInit = function () {
            _this.sprite = _this.entity.getComponent(RendnerComponent.type);
            _this.sprite.draw = _this.draw;
        };
        _this.onTick = function () {
            var _a;
            _this.ticks++;
            _this.timePassed += Runtime.deltaTime;
            if (!Runtime.Input.enter) {
                _this.keyDown = false;
            }
            if (_this.timePassed > 10 || (Runtime.Input.enter && !_this.keyDown)) {
                (_a = Runtime.SceneManager) === null || _a === void 0 ? void 0 : _a.setScene("main_menu");
            }
        };
        _this.draw = function (context) {
            context.fillStyle = "white";
            context.font = "20px 8 Bit Wonder";
            context.fillText(_this.formatScore(Runtime.GlobalStorage.get("currentScore")), 162, 70);
        };
        return _this;
    }
    ShowScoreC.prototype.formatScore = function (score) {
        var finalD = 6;
        var digits = score == 0 ? 1 : Math.floor(Math.log10(score) + 1);
        var fText = "";
        for (var i = 0; i < finalD - digits; i++) {
            fText += "0";
        }
        return fText + score;
    };
    return ShowScoreC;
}(ScriptComponent));

function WaitLevel(mgr) {
    var _a;
    var e = mgr.createEntity();
    var sprite = new SpriteComponent((_a = Runtime.Media) === null || _a === void 0 ? void 0 : _a.getMedia("wait_menu"), 336, 224);
    e.addComponent(sprite);
    var controller = new WaitMenuC();
    e.addComponent(controller);
}
var WaitMenuC = /** @class */ (function (_super) {
    __extends(WaitMenuC, _super);
    function WaitMenuC() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.timePassed = 0;
        _this.ticks = 0;
        _this.keyDown = true;
        _this.onInit = function () {
            _this.sprite = _this.entity.getComponent(RendnerComponent.type);
        };
        _this.onTick = function () {
            var _a;
            _this.ticks++;
            _this.timePassed += Runtime.deltaTime;
            if (_this.ticks % 2 == 0) {
                _this.sprite.frame = (_this.sprite.frame + 1) % 13;
            }
            if (!Runtime.Input.enter)
                _this.keyDown = false;
            if (_this.timePassed > 10 || (Runtime.Input.enter && !_this.keyDown)) {
                (_a = Runtime.SceneManager) === null || _a === void 0 ? void 0 : _a.setScene("main");
            }
        };
        return _this;
    }
    return WaitMenuC;
}(ScriptComponent));

var link = document.createElement('link');
link.setAttribute('rel', 'stylesheet');
link.setAttribute('type', 'text/css');
link.setAttribute('href', '/assets/font/a.ttf');
document.head.appendChild(link);
function start() {
    document.body.style.backgroundColor = "#181F1C";
    var cont = document.createElement("div");
    cont.style.width = "100%";
    cont.style.display = "flex";
    cont.style.justifyContent = "center";
    cont.style.alignItems = "center";
    cont.style.flexDirection = "column";
    document.body.appendChild(cont);
    //setup game screen
    var a = document.createElement("div");
    a.focus();
    a.style.width = (200 * 4) + 'px';
    // a.style.height = (160 * 4) + 'px';
    cont.appendChild(a);
    //setup instructions
    var instructions = document.createElement("p");
    instructions.style.color = "white";
    instructions.innerText = "Controls:\nSpace/Control - accept\nArrows/AWSD - move";
    cont.appendChild(instructions);
    var p = new Project();
    p.rootElement = a;
    p.tps = 60;
    p.resolution.x = 320;
    p.resolution.y = 224;
    p.media = [
        { name: "diskSprite", src: "/assets/diskEnemy/sprite.png", type: MediaTypes.IMAGE },
        { name: "enemyBasicBullet", src: "/assets/bullets/enemy_basic_bullet.png", type: MediaTypes.IMAGE },
        { name: "spikeSprite", src: "/assets/spikeEnemy/sprite.png", type: MediaTypes.IMAGE },
        { name: "squashingSprite", src: "/assets/squashingEnemy/sprite.png", type: MediaTypes.IMAGE },
        { name: "wormSprite", src: "/assets/wormEnemy/sprite.png", type: MediaTypes.IMAGE },
        { name: "ufoSprite", src: "/assets/ufoEnemy/sprite.png", type: MediaTypes.IMAGE },
        { name: "thinSprite", src: "/assets/thinEnemy/sprite.png", type: MediaTypes.IMAGE },
        { name: "blockSprite", src: "/assets/blockEnemy/sprite.png", type: MediaTypes.IMAGE },
        { name: "level1", src: "/assets/levels/1.png", type: MediaTypes.IMAGE },
        { name: "player_sprite", src: "/assets/player/sprite.png", type: MediaTypes.IMAGE },
        { name: "player_bullet_basic", src: "/assets/bullets/player_bullet.png", type: MediaTypes.IMAGE },
        { name: "player_bullet_railgun", src: "/assets/bullets/railgun_bullet.png", type: MediaTypes.IMAGE },
        { name: "player_bullet_pulse", src: "/assets/bullets/pulse_bullet.png", type: MediaTypes.IMAGE },
        { name: "player_bullet_pulse_short", src: "/assets/bullets/pulse_short_bullet.png", type: MediaTypes.IMAGE },
        { name: "player_explosion", src: "/assets/player/explosion.png", type: MediaTypes.IMAGE },
        { name: "enemy_explosion", src: "/assets/enemy/explosion.png", type: MediaTypes.IMAGE },
        { name: "hud_guns", src: "/assets/hud/guns.png", type: MediaTypes.IMAGE },
        { name: "weapon_level", src: "/assets/hud/weapon_level.png", type: MediaTypes.IMAGE },
        { name: "hp_icon", src: "/assets/enemy/hp_drop.png", type: MediaTypes.IMAGE },
        { name: "space_ship", src: "/assets/player/space_ship.png", type: MediaTypes.IMAGE },
        { name: "game_over", src: "/assets/menus/game_over.png", type: MediaTypes.IMAGE },
        { name: "main_menu", src: "/assets/menus/main.png", type: MediaTypes.IMAGE },
        { name: "wait_menu", src: "/assets/menus/wait_for_level.png", type: MediaTypes.IMAGE },
        { name: "save_score", src: "/assets/menus/save_score.png", type: MediaTypes.IMAGE },
        { name: "hallOfFame", src: "/assets/menus/hall_of_fame.png", type: MediaTypes.IMAGE },
        { name: "show_score", src: "/assets/menus/show_score.png", type: MediaTypes.IMAGE },
    ];
    var s1 = new Scene("main");
    p.addScene(s1);
    s1.sceneCreator = function (mgr) {
        //! World must be first for colliders to work correctly
        //TODO make coliders more generic
        LevelManager(mgr);
    };
    var s2 = new Scene("game_over");
    p.addScene(s2);
    s2.sceneCreator = function (mgr) {
        GameOver(mgr);
    };
    var s3 = new Scene("main_menu");
    p.addScene(s3);
    s3.sceneCreator = function (mgr) {
        MainMenu(mgr);
    };
    var s4 = new Scene("wait_for_level");
    p.addScene(s4);
    s4.sceneCreator = function (mgr) {
        WaitLevel(mgr);
    };
    var s5 = new Scene("save_menu");
    p.addScene(s5);
    s5.sceneCreator = function (mgr) {
        SaveMenu(mgr);
    };
    var s6 = new Scene("hall_of_fame");
    p.addScene(s6);
    s6.sceneCreator = function (mgr) {
        HallOfFame(mgr);
    };
    var s7 = new Scene("show_score");
    p.addScene(s7);
    s7.sceneCreator = function (mgr) {
        ShowScore(mgr);
    };
    p.keyMapping = [
        { event: "up", keys: ["w", "ArrowUp"] },
        { event: "left", keys: ["a", "ArrowLeft"] },
        { event: "down", keys: ["s", "ArrowDown"] },
        { event: "right", keys: ["d", "ArrowRight"] },
        { event: "enter", keys: [" ", "Control"] }
    ];
    p.startScene = "main_menu";
    var main = new Main(p);
    main.load();
    main.start();
}
start();
