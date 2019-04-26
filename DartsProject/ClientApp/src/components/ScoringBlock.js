import React, { Component } from 'react';

export default class ScoringBlock extends Component {
    render() {
        return (
            <div className="scoring-block">
                <div className="scoring-row">
                    <div className="scoring-row-cells first flex">
                        <div className="scoring-cell" tag="1" onClick={() => { this.props.onShot(1, 1); }}>1</div>
                        <div className="scoring-cell" tag="1" onClick={() => { this.props.onShot(1, 2); }}>2</div>
                        <div className="scoring-cell" tag="1" onClick={() => { this.props.onShot(1, 3); }}>3</div>
                        <div className="scoring-cell" tag="1" onClick={() => { this.props.onShot(1, 4); }}>4</div>
                        <div className="scoring-cell" tag="1" onClick={() => { this.props.onShot(1, 5); }}>5</div>
                        <div className="scoring-cell" tag="1" onClick={() => { this.props.onShot(1, 6); }}>6</div>
                        <div className="scoring-cell" tag="1" onClick={() => { this.props.onShot(1, 7); }}>7</div>
                        <div className="scoring-cell" tag="1" onClick={() => { this.props.onShot(1, 8); }}>8</div>
                        <div className="scoring-cell" tag="1" onClick={() => { this.props.onShot(1, 9); }}>9</div>
                        <div className="scoring-cell" tag="1" onClick={() => { this.props.onShot(1, 10); }}>10</div>
                        <div className="scoring-cell" tag="1" onClick={() => { this.props.onShot(1, 11); }}>11</div>
                        <div className="scoring-cell" tag="1" onClick={() => { this.props.onShot(1, 12); }}>12</div>
                        <div className="scoring-cell" tag="1" onClick={() => { this.props.onShot(1, 13); }}>13</div>
                        <div className="scoring-cell" tag="1" onClick={() => { this.props.onShot(1, 14); }}>14</div>
                        <div className="scoring-cell" tag="1" onClick={() => { this.props.onShot(1, 15); }}>15</div>
                        <div className="scoring-cell" tag="1" onClick={() => { this.props.onShot(1, 16); }}>16</div>
                        <div className="scoring-cell" tag="1" onClick={() => { this.props.onShot(1, 17); }}>17</div>
                        <div className="scoring-cell" tag="1" onClick={() => { this.props.onShot(1, 18); }}>18</div>
                        <div className="scoring-cell" tag="1" onClick={() => { this.props.onShot(1, 19); }}>19</div>
                        <div className="scoring-cell" tag="1" onClick={() => { this.props.onShot(1, 20); }}>20</div>
                        <div className="scoring-cell" tag="1" onClick={() => { this.props.onShot(1, 25); }}>25</div>
                    </div>
                </div>

                <div className="scoring-row">
                    <div className="scoring-row-cells second flex">
                        <div className="multiplier-second">x <span className="multiplier-second-digit">2:</span></div>
                        <div className="scoring-cell" onClick={() => { this.props.onShot(2, 1); }}>1</div>
                        <div className="scoring-cell" onClick={() => { this.props.onShot(2, 2); }}>2</div>
                        <div className="scoring-cell" onClick={() => { this.props.onShot(2, 3); }}>3</div>
                        <div className="scoring-cell" onClick={() => { this.props.onShot(2, 4); }}>4</div>
                        <div className="scoring-cell" onClick={() => { this.props.onShot(2, 5); }}>5</div>
                        <div className="scoring-cell" onClick={() => { this.props.onShot(2, 6); }}>6</div>
                        <div className="scoring-cell" onClick={() => { this.props.onShot(2, 7); }}>7</div>
                        <div className="scoring-cell" onClick={() => { this.props.onShot(2, 8); }}>8</div>
                        <div className="scoring-cell" onClick={() => { this.props.onShot(2, 9); }}>9</div>
                        <div className="scoring-cell" onClick={() => { this.props.onShot(2, 10); }}>10</div>
                        <div className="scoring-cell" onClick={() => { this.props.onShot(2, 11); }}>11</div>
                        <div className="scoring-cell" onClick={() => { this.props.onShot(2, 12); }}>12</div>
                        <div className="scoring-cell" onClick={() => { this.props.onShot(2, 13); }}>13</div>
                        <div className="scoring-cell" onClick={() => { this.props.onShot(2, 14); }}>14</div>
                        <div className="scoring-cell" onClick={() => { this.props.onShot(2, 15); }}>15</div>
                        <div className="scoring-cell" onClick={() => { this.props.onShot(2, 16); }}>16</div>
                        <div className="scoring-cell" onClick={() => { this.props.onShot(2, 17); }}>17</div>
                        <div className="scoring-cell" onClick={() => { this.props.onShot(2, 18); }}>18</div>
                        <div className="scoring-cell" onClick={() => { this.props.onShot(2, 19); }}>19</div>
                        <div className="scoring-cell" onClick={() => { this.props.onShot(2, 20); }}>20</div>
                        <div className="scoring-cell" onClick={() => { this.props.onShot(2, 25); }}>25</div>
                    </div>
                </div>
                <div className="scoring-row">
                    <div className="scoring-row-cells third flex">
                        <div className="multiplier-third">x <span className="multiplier-third-digit">3:</span></div>
                        <div className="scoring-cell" onClick={() => { this.props.onShot(3, 1); }}>1</div>
                        <div className="scoring-cell" onClick={() => { this.props.onShot(3, 2); }}>2</div>
                        <div className="scoring-cell" onClick={() => { this.props.onShot(3, 3); }}>3</div>
                        <div className="scoring-cell" onClick={() => { this.props.onShot(3, 4); }}>4</div>
                        <div className="scoring-cell" onClick={() => { this.props.onShot(3, 5); }}>5</div>
                        <div className="scoring-cell" onClick={() => { this.props.onShot(3, 6); }}>6</div>
                        <div className="scoring-cell" onClick={() => { this.props.onShot(3, 7); }}>7</div>
                        <div className="scoring-cell" onClick={() => { this.props.onShot(3, 8); }}>8</div>
                        <div className="scoring-cell" onClick={() => { this.props.onShot(3, 9); }}>9</div>
                        <div className="scoring-cell" onClick={() => { this.props.onShot(3, 10); }}>10</div>
                        <div className="scoring-cell" onClick={() => { this.props.onShot(3, 11); }}>11</div>
                        <div className="scoring-cell" onClick={() => { this.props.onShot(3, 12); }}>12</div>
                        <div className="scoring-cell" onClick={() => { this.props.onShot(3, 13); }}>13</div>
                        <div className="scoring-cell" onClick={() => { this.props.onShot(3, 14); }}>14</div>
                        <div className="scoring-cell" onClick={() => { this.props.onShot(3, 15); }}>15</div>
                        <div className="scoring-cell" onClick={() => { this.props.onShot(3, 16); }}>16</div>
                        <div className="scoring-cell" onClick={() => { this.props.onShot(3, 17); }}>17</div>
                        <div className="scoring-cell" onClick={() => { this.props.onShot(3, 18); }}>18</div>
                        <div className="scoring-cell" onClick={() => { this.props.onShot(3, 19); }}>19</div>
                        <div className="scoring-cell" onClick={() => { this.props.onShot(3, 20); }}>20</div>
                        <div className="scoring-cell" onClick={() => { this.props.onShot(1, 0); }}>0</div>
                    </div>
                </div>
            </div>
        );
    }
}
