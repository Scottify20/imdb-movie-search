// All of the buttons/elements that are listed in the buttonList array will be disabled.

// Being disabled means that the elements's pointer-events will be set to none and their opacity will be reduced through a css class to tell the user that the buttons are disabled.

// Disable buttons function

const ButtonsDisabler = (isOn: boolean) => {
  document.addEventListener;
  if (isOn) {
    DisableButtons.disableMutipleButtonsbyIds(
      'links__preferences',
      'links__favourites',
      'links__about',
      'favourites-btn'
    );
    DisableButtons.disableMultipleButtonByClass('view-details-btn');
  }
};

class DisableButtons {
  public static buttonList: Element[] = [];

  private static disableButtons() {
    DisableButtons.buttonList.forEach((button) => {
      if (!this.isButtonAlreadyDisabled(button)) {
        button.classList.add('button-disabled');
      }
    });
  }

  private static isButtonAlreadyDisabled(button: Element): boolean {
    if (button.classList.contains('button-disabled')) {
      return true;
    } else {
      return false;
    }
  }

  public static disableButtonbyId(id: string) {
    const buttonElement = document.getElementById(id);
    if (buttonElement) {
      this.buttonList.push(buttonElement);
    } else {
      console.log(`Element with id: ${id} does not exist.`);
    }

    this.disableButtons();
  }

  public static disableMutipleButtonsbyIds(...idList: string[]) {
    idList.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        this.buttonList.push(element);
      } else {
        console.log(`Element with id: ${id} does not exist.`);
      }
    });

    this.disableButtons();
  }

  public static disableMultipleButtonByClass(className: string) {
    const buttonsToAdd = Array.from(document.querySelectorAll(`.${className}`));

    this.buttonList = [...this.buttonList, ...buttonsToAdd];

    this.disableButtons();
  }
}

export default ButtonsDisabler;
