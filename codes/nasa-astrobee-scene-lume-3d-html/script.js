"use strict";
const { useDefaultNames, booleanAttribute, Element, element, attribute, html } = LUME;
const assetRoot = 'https://rawcdn.githack.com/lume/lume/6b69d0a29eb81da44ec7f4a25c663773cdec8976/docs';
const bodyModelUrl = assetRoot + '/examples/nasa-astrobee-robot/astrobee/body.dae';
const pmcModelUrl = assetRoot + '/examples/nasa-astrobee-robot/astrobee/pmc.dae';
const pmcSkinModelUrl = assetRoot + '/examples/nasa-astrobee-robot/astrobee/pmc_skin_.dae';
const pmcBumperModelUrl = assetRoot + '/examples/nasa-astrobee-robot/astrobee/pmc_bumper.dae';
// Find more at https://blog.kuula.co/360-images-ruben-frosali
const lunaStation = assetRoot + '/examples/nasa-astrobee-robot/luna-station.jpg';
// Registers the LUME elements with their default tag names.
useDefaultNames();
// Long live HTML elements!
class App extends Element {
    constructor() {
        super();
        this.rotationDirection = 1; // clockwise
        this.rotationAmount = 0.2; // degrees
        this.rotationEnabled = true;
        this.view = 'free';
        this.astrobee;
        this.sceneContainer;
        this.loading;
        this.models = [];
        this.template = () => html `
			<loading-icon ref=${el => (this.loading = el)}></loading-icon>

			<div class="sceneContainer hidden" ref=${el => (this.sceneContainer = el)}>
				<lume-scene webgl enable-css="false" environment=${() => lunaStation}>
					<lume-node align-point="0.5 0.5 0.5">
						<lume-camera-rig
							active=${() => this.view === 'free'}
							initial-polar-angle="30"
							min-distance="0.4"
							max-distance="2"
							dolly-speed="0.002"
							initial-distance="1"
						/>
						<lume-node rotation=${() => [this.view === 'top' ? -90 : 0, 0, 0]}>
							<lume-perspective-camera active=${() => this.view !== 'free'} position="0 0 0.7" />
						</lume-node>
					</lume-node>

					<lume-point-light intensity="0.3" align-point="0.5 0.5 0.5" color="#a3ffff" position="0 90 0" />
					<lume-point-light intensity="0.3" align-point="0.5 0.5 0.5" color="#a3ffff" position="0 -90 0" />
					<lume-point-light intensity="0.3" align-point="0.5 0.5 0.5" color="#a3ffff" position="0 0 90" />
					<lume-point-light intensity="0.3" align-point="0.5 0.5 0.5" color="#a3ffff" position="0 0 -90" />
					<lume-point-light intensity="0.3" align-point="0.5 0.5 0.5" color="#a3ffff" position="90 80 0" />
					<lume-point-light intensity="0.3" align-point="0.5 0.5 0.5" color="#a3ffff" position="90 -80 0" />
					<lume-point-light intensity="0.3" align-point="0.5 0.5 0.5" color="#a3ffff" position="-90 80 0" />
					<lume-point-light intensity="0.3" align-point="0.5 0.5 0.5" color="#a3ffff" position="-90 -80 0" />

					<lume-node ref=${el => (this.astrobee = el)} align-point="0.5 0.5 0.5" rotation=${() => this.astrobeeRotation}>
						<lume-collada-model ref=${el => this.models.push(el)} src=${() => bodyModelUrl} />
						<lume-collada-model ref=${el => this.models.push(el)} src=${() => pmcModelUrl} />
						<lume-collada-model ref=${el => this.models.push(el)} src=${() => pmcSkinModelUrl} />
						<lume-collada-model ref=${el => this.models.push(el)} src=${() => pmcBumperModelUrl} />

						<comment style="display:none">The other side.</comment>
						<lume-node scale="1 1 -1">
							<lume-collada-model ref=${el => this.models.push(el)} src=${() => pmcModelUrl} />
							<lume-collada-model ref=${el => this.models.push(el)} src=${() => pmcSkinModelUrl} />
							<lume-collada-model ref=${el => this.models.push(el)} src=${() => pmcBumperModelUrl} />
						</lume-node>
					</lume-node>

					<lume-sphere
						has="basic-material"
						texture=${() => lunaStation}
						color="white"
						align-point="0.5 0.5 0.5"
						mount-point="0.5 0.5 0.5"
						size="100 100 100"
						sidedness="double"
						cast-shadow="false"
						receive-shadow="false"
					/>
				</lume-scene>
			</div>

			<details class="ui">
				<summary>Options</summary>
				<fieldset>
					<legend>Rotation</legend>
					<label>
						<input type="checkbox" checked=${() => this.rotationEnabled} onChange=${this.toggleRotation} />&nbsp;
						Enable rotation.
					</label>
					<br />
					<label>
						<input
							type="checkbox"
							checked=${() => this.rotationDirection < 0}
							onChange=${this.toggleRotationDirection}
						/>&nbsp;
						Clockwise rotation.
					</label>
				</fieldset>
				<fieldset>
					<legend>View</legend>
					<label>
						<input type="radio" name="side" checked=${() => this.view === 'side'} onChange=${this.changeView} />&nbsp;
						Side view.
					</label>
					<br />
					<label>
						<input type="radio" name="top" checked=${() => this.view === 'top'} onChange=${this.changeView} />&nbsp;
						Top view
					</label>
					<br />
					<label>
						<input type="radio" name="free" checked=${() => this.view === 'free'} onChange=${this.changeView} />&nbsp;
						Free view
					</label>
				</fieldset>
			</details>
		`;
        this.css = /*css*/ `
			:host {
				width: 100%;
				height: 100%;
			}

			loading-icon {
				--loading-icon-color: 117, 199, 199; /*light teal*/
				position: absolute;
				top: 50%; left: 50%;
				transform: translate(-50%, -50%) scale(2);
				width: 10px; height: 10px;
			}

			.sceneContainer { width: 100%; height: 100%; }

			.ui {
				position: absolute;
				margin: 15px; padding: 10px;
				top: 0; left: 0;
				color: white;
				font-family: sans-serif;
				background: rgba(0, 0, 0, 0.6);
				border-radius: 7px;
				user-select: none; -webkit-user-select: none;

				--teal: #75c7c7;
				--purple: #c595c9;
			}

			summary, input, label {
				cursor: pointer;
				outline: none;
			}
			summary::marker {
				color: var(--teal);
			}

			fieldset legend {
				color: var(--teal);
			}
			fieldset {
				border-color: var(--teal);
				border-radius: 4px;
			}
			fieldset:nth-child(2) legend {
				color: var(--purple);
			}
			fieldset:nth-child(2) {
				border-color: var(--purple);
			}

			* { transition: opacity 1s; }
			.hidden { opacity: 0 !important; }
		`;
        this.astrobeeRotation = (x, y, z, _time) => [x, y + this.rotationAmount * this.rotationDirection, z];
        this.toggleRotation = () => {
            this.rotationEnabled = !this.rotationEnabled;
            if (this.rotationEnabled)
                this.astrobee.rotation = this.astrobeeRotation;
            else
                this.astrobee.rotation = () => false; // stops rotation
        };
        this.toggleRotationDirection = () => (this.rotationDirection *= -1);
        this.changeView = event => {
            const input = event.target;
            if (input.checked)
                this.view = input.name;
        };
    }
    async connectedCallback() {
        super.connectedCallback();
        const img = new Image;
        img.src = lunaStation;
        // Wait until all assets are loaded before showing the scene.
        await Promise.all([
            new Promise(r => img.onload = r),
            ...this.models.map(model => new Promise(r => model.on('MODEL_LOAD', r))),
            new Promise(r => setTimeout(r, 1500)), // keep loader visible at least 1.5 sec, for effect
        ]);
        this.sceneContainer.classList.remove('hidden');
        this.loading.classList.add('hidden');
    }
}
App.observedAttributes = {
    rotationDirection: attribute.number(1),
    rotationAmount: attribute.number(1),
    rotationEnabled: attribute.boolean(true),
    view: attribute.string('free'),
};
element('astrobee-scene')(App);