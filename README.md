## RS School NodeJS - Caesar cypher CLI-tool project
---
## Table of contents
* [General info](#general-info)
* [Environment](#environment)
* [Setup](#setup)
* [Instructions](#instructions)
* [Examples](#examples)
---
## General info
Project is [Caesar's cypher](https://en.wikipedia.org/wiki/Caesar_cipher) CLI implementation.

Main goal is mandatory use read, write and transform streams in NodeJS.  


## Environment
Project created using:
* NodeJS v14.15.4


## Setup
Before proceed You need to install [NodeJS](https://nodejs.org/en/download/) if You still haven't done it yet.

To run this project:


Clone this repository to your local folder:
```
$ git clone https://github.com/petrgali/Caesar-CLI-tool.git
```

Switch to Caesar-CLI-tool branch:
```
$ git checkout Caesar-CLI-tool
```
Project have some dependencies, so you need to install them additionally:
```
$ npm i
```
And finally we've done!


## Instructions

Caesar cypher app - is a CLI tool, which means that You can use it via CLI.
The App have 4 options total, 2 of them are mandatory to use.

List of available options:
- `--action` or shortened `-a`: app support `encode` and `decode` action. This option is REQUIRED - app will not start without it
- `--shift` or shortened `-s` : it can be any integer numbers both positive and negative. This option is also REQUIRED.
- `--input` or shortened `-i` : you can specify any local text file containing text You want to encode/decode otherwise You will be able print anything right in console window   
- `--output` or shortened `-o`: using this option You can specify any local existing text file in which converted text will be saved otherwise app output will be printed in console window


## Examples

1. _-a (--action)_ is **encode**

```bash
$ node my_caesar_cli -a encode -s 7 -i "./input.txt" -o "./output.txt"
```
> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`

```bash
$ node my_caesar_cli --action encode --shift 7 --input plain.txt --output encoded.txt
```
> plain.txt
> `This is secret. Message about "_" symbol!`

> encoded.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`

2. _-a (--action)_ is **decode**  
_Decoding encoded initial string with the same -s(--shift) number produces the initial string._

```bash
$ node my_caesar_cli --action decode --shift 7 --input encoded.txt --output plain.txt
```

> encoded.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`

> plain.txt
> `This is secret. Message about "_" symbol!`

3. _(Optional) Negative shift handling_

```bash
$ node my_caesar_cli --action encode --shift -1 --input plain.txt --output encoded.txt
```

> plain.txt
> `This is secret. Message about "_" symbol!`

> encoded.txt
> `Sghr hr rdbqds. Ldrrzfd zants "_" rxlank!`