/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import "../card/PreviewCardGrid";

import { customElement } from "lit/decorators.js";
import { MAX_RANGE } from "../../constants";
import { GradientBase } from "./GradientBase";
import { LinearFillDirection } from "./GradientType";

@customElement("add-on-linear-gradient")
export class LinearGradient extends GradientBase<LinearFillDirection> {
    constructor() {
        super(LinearFillDirection.Diagonal);
    }

    protected override getAllDirections(): string[] {
        return Object.keys(LinearFillDirection);
    }

    protected override getGradientImage(fillDirection: LinearFillDirection): string {
        const canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;

        const canvasContext = canvas.getContext("2d");
        const canvasGradient = this._getGradient(canvasContext, fillDirection);

        const stop1 = Number((this.stop1 / MAX_RANGE).toFixed(1));
        const stop2 = Number((this.stop2 / MAX_RANGE).toFixed(1));

        canvasGradient.addColorStop(stop1, this.startingColor);
        canvasGradient.addColorStop(stop2, this.endingColor);

        canvasContext.fillStyle = canvasGradient;
        canvasContext.fillRect(0, 0, this.width, this.height);

        return canvas.toDataURL("image/png");
    }

    private _getGradient(canvasContext: CanvasRenderingContext2D, fillDirection: LinearFillDirection): CanvasGradient {
        let x0: number;
        let y0: number;
        let x1: number;
        let y1: number;

        switch (fillDirection) {
            case LinearFillDirection.Diagonal: {
                x0 = 0;
                y0 = 0;
                x1 = this.width;
                y1 = this.height;

                break;
            }
            case LinearFillDirection.Vertical: {
                x0 = 0;
                y0 = 0;
                x1 = this.width;
                y1 = 0;

                break;
            }
            case LinearFillDirection.Horizontal: {
                x0 = 0;
                y0 = 0;
                x1 = 0;
                y1 = this.height;

                break;
            }
            default: {
                throw new Error(`'${fillDirection}' is not a valid direction.`);
            }
        }

        return canvasContext.createLinearGradient(x0, y0, x1, y1);
    }
}
