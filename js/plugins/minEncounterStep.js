/*:
@plugindesc
敵が出現するまでの最小エンカウント歩数を設定することができます

@author
シトラス

@help
このプラグインには、プラグインコマンドはありません
minEncounterStepに数字を設定すると、
その数値の歩数だけエンカウントが発生しません

マップごとに最低エンカウント歩数を設定したい場合、
マップのメモ欄に<minEncounterStep:最小エンカウント歩数>
と設定してください

@param minEncounterStep
@desc
ゲーム全体における、最小エンカウント歩数を設定します
@default 10
*/

//敵遭遇までの歩数を決定
Game_Player.prototype.makeEncounterCount = function() {
	var n = $gameMap.encounterStep();
	var minEncounterStep = Number(PluginManager.parameters("minEncounterStep").minEncounterStep);
	if($dataMap.meta.minEncounterStep !== undefined){
		minEncounterStep = Number($dataMap.meta.minEncounterStep);
	}
	this._encounterCount = Math.randomInt(n) + Math.randomInt(n) + minEncounterStep;
};
