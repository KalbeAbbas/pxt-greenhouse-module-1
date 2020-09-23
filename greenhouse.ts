//% color=105 weight=100 icon="\uf299" block="Greenhouse kit"
//% groups='["OD01", "SG33", "SL01", "SW01", "SW07", "SH01", "SD CARD", "Wifi-Common", "ATT"]'
namespace greenhouse
{

    let SI1145_I2C_ADDR = 0x60
    let TSL_I2C_ADDR = 0x29
    let VEML_I2C_ADDR = 0x10

    let v1 = 0
    let v2 = 0
    function checkID(): void {
        if (getreg(0x00, SI1145_I2C_ADDR) == 0x45) v2 = 1;
        else if (readVEML(0x0C) == (0x26 & 0x0026)) v1 = 1;
    }

        
    function readVEML(addr: number): number {
        pins.i2cWriteNumber(0x10, addr, NumberFormat.UInt8LE, true)
        let rawData = pins.i2cReadNumber(0x10, NumberFormat.UInt16LE, false);
        basic.showNumber(rawData)
        return rawData;
    }

    function getreg(reg: number, addr: number): number {
        pins.i2cWriteNumber(addr, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(addr, NumberFormat.UInt8BE);
    }

    checkID();


    basic.showNumber(v1)

    basic.showString("Hello!")

    basic.showNumber(v2)

}