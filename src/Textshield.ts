import Decoder from "./Decoder";
import EncodedMessage from "./EncodedMessage";
import { TextDisplay } from "./TextDisplay";

export class Textshield {
  public body: HTMLElement;
  public options: any;

  private decoder: Decoder;

  constructor(body: HTMLElement, options: any) {
    this.body = body;
    this.decoder = new Decoder();

    this.initialize();
  }

  private initialize(): void {
    let shieldedElements = this.getShieldedElements();
    for (let element of shieldedElements) {
      let encodedMessage = EncodedMessage.parse(element.textContent);

      if (encodedMessage) {
        let message = this.decoder.decode(encodedMessage);
        let style = window.getComputedStyle(element);
        let textDisplay = new TextDisplay(message, style);

        //element.textContent = message;
        element.parentNode.replaceChild(textDisplay.getCanvas(), element);
      }
    }
  }

  private getShieldedElements(): HTMLElement[] {
    let elements = this.body.getElementsByTagName("shield");
    return Array.prototype.slice.call(elements);
  }
}

export default Textshield;
