//=============================================================================
// Plugin_Name : RX_T_LoseState
// File_Name   : RX_T_LoseState.js
// Version     : 1.00
// Copylight   : 2015 TYPE74RX-T
//=============================================================================


//=============================================================================
/*:
 * @plugindesc 全員が自然回復不能な行動不能ステートを受けると全滅、敗北扱いにできます。
 * @author TYPE74RX-T
 * @help 全員が回復不能な行動不能ステートを受けると全滅
 * ============================================================================
 * * 全員が自然回復不能な行動不能ステートを受けると全滅
 * ============================================================================
 * 通常、戦闘中自動で回復しない行動不能ステートをパーティ全員が受けると
 * パーティが全滅するまで敵から一方的に攻撃を受け続けたり
 * 場合によってはゲームが進まなくなることがあります。
 * このプラグインを導入することで、上記の状態になった場合
 * 直ちに全滅、敗北扱いになります。
 *
 * また、これを利用して「石化」等のステートを作ることができるようになります。
 *
 * 【仕様】
 * この機能は味方のみ適用されます。
 * 上記条件に該当するのは自動回復のタイミングの設定が「なし」で
 * かつ、ダメージで解除されない行動不能ステートとなります。
 * ============================================================================
 * * 使い方
 * ============================================================================
 * プラグインを導入するだけでその効力を発揮します。
 * ============================================================================
 * * ドキュメント終了 
 * ============================================================================
*/

(function() {
	
	// Game_Battler

	// ロックされたステートがあるか
	Game_Battler.prototype.rxLockState = function() {
	    var flag = false;
	    this.states().forEach(function(state) {
	        if (state.restriction === 4 && state.autoRemovalTiming === 0 && !state.removeByDamage) {
	            flag = true;
	        }
	    }, this);
	    if (flag) return 1;
	    return 0;
	};

	// Game_Party
	var rx_t_gppiA151111_isAllDead = Game_Party.prototype.isAllDead;
	Game_Party.prototype.isAllDead = function() {
	    var rxDcount = 0, rxDeadCount = 0;
	    this.members().forEach(function(rx_member) {
	        rxDeadCount += rx_member.rxLockState();
	        rxDcount += 1
	    }, this);
	    if (rxDeadCount === rxDcount) return true;
	    rx_t_gppiA151111_isAllDead.call(this);
	};

})();