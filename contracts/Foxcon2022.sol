// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import 'base64-sol/base64.sol';

import './HexStrings.sol';

/* 
  visibility modifiers
  ------------------------------------------------------
  public: anyone can call
  private: only this contract
  internal: only this contract and inheriting contracts
  external: only external calls (not this contract)
*/

contract Foxcon2022 is ERC721Enumerable, Ownable {
  using Strings for uint256;
  using HexStrings for uint160;
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  uint16 _myTotalSupply = 0; // max value 65,535
  address _owner;

  // * size added 0.3KB
  uint16 public MAX_SUPPLY = 8999; // max value 65,535
  uint256 public constant vipTicketPrice = 20000000000000000; //0.02 ETH
  uint256 public constant gaTicketPrice = 10000000000000000; //0.01 ETH

  // mapping (uint256 => bool) public gaTicketHolders;
  mapping (uint256 => bool) public vipTicketHolders;

  constructor() ERC721("Foxcon2022", "FXC22") {
    _tokenIds._value = 999;
    _owner = msg.sender;
  }

  mapping (uint256 => bytes3) public color;
  uint256 mintDeadline = block.timestamp + 168 hours;

  function totalSupply() view public override returns(uint256) {
    return _myTotalSupply; // gas optimization (otherwise totalSupply() when mint)
  }

  /**
    * @dev Returns the wallet of a given wallet. Mainly for ease for frontend devs.
    * @param _wallet The wallet to get the tokens of. NEEDS ENUMERABLE
    // * size added 0.3KB
  */
  function walletOfOwner(address _wallet) public view returns (uint256[] memory) {
    uint256 tokenCount = balanceOf(_wallet);

    uint256[] memory tokensId = new uint256[](tokenCount);
    for (uint256 i; i < tokenCount; i++) {
      tokensId[i] = tokenOfOwnerByIndex(_wallet, i);
    }
    return tokensId;
  }

  // Add Transfer balance function

  function contractURI() public pure returns (string memory) {
    string memory image = Base64.encode(bytes(generateCollectionSvg()));

    bytes memory collectionJsonString = bytes(abi.encodePacked(
      '{"name":"Foxcon2022",',
      '"description":"Foxcon2022 is the most premier fox event in the solar system this year. Join friends from all over the world this December as the skulk descend on the Web3 space and dig their paws into everything Ethereum. Stay foxy, your NFT purchase is your ticket to the event!",', 
      '"image":"data:image/svg+xml;base64,',image,'",'
      '"external_link": "https://metamask.io"}'
    ));

    return string(
      abi.encodePacked(
        'data:application/json;base64,',
        Base64.encode(bytes(abi.encodePacked(collectionJsonString)))
      )
    );
  }

  function generateCollectionSvg() internal pure returns (string memory) {
    return string(abi.encodePacked(
      '<svg preserveAspectRatio="xMinYMin meet" viewBox="0 0 35 33" xmlns="http://www.w3.org/2000/svg" style="stroke-linejoin:round;stroke-miterlimit:2;">',
        '<g><path d="M10.286,29.139L10.285,29.138L2.499,31.283L0.289,23.679L0.288,23.679L2.677,16.226L2.69,16.222L2.677,16.226L1.098,14.369L1.785,13.874L0.686,12.871L1.524,12.21L0.425,11.372L1.153,10.822L-0,5.211L1.73,0L1.73,0L12.866,4.166L12.866,4.167L22.134,4.167L22.134,4.166L33.27,0L35,5.211L33.847,10.822L34.575,11.372L33.476,12.21L34.314,12.871L33.215,13.874L33.902,14.369L32.323,16.226L32.302,16.22L32.322,16.226L34.725,23.679L32.501,31.283L24.715,29.138L24.715,29.137L24.714,29.137L23.205,30.374L20.129,32.506L14.87,32.506L11.795,30.374L10.286,29.139ZM14.912,29.604L14.582,29.907L14.912,29.604L14.582,29.907L14.912,29.604ZM20.088,29.604L20.774,29.864L20.088,29.604ZM20.088,29.604L20.06,26.869L19.401,26.415L19.402,26.413L19.416,20.255L20.308,21.725L19.416,20.255L19.594,17.752L27.31,17.408L27.31,17.408L19.594,17.751L19.595,17.736L19.415,20.255L19.401,26.415L15.598,26.415L15.598,26.414L15.443,21.757L15.406,17.753L15.443,21.757L13.552,19.333L10.82,20.585L15.443,21.757L15.598,26.415L14.939,26.869L14.911,29.604L20.088,29.604ZM24.716,29.137L28.354,23.679L24.716,29.137ZM20.061,26.868C20.061,26.868 20.947,26.175 21.834,25.482C22.72,24.789 24.07,23.733 24.07,23.733L20.061,26.868ZM7.689,17.408L10.82,20.585L7.69,17.409L7.689,17.408ZM10.82,20.585C10.82,20.585 12.16,20.973 10.82,20.585C9.838,20.301 10.83,20.588 10.82,20.585C10.799,20.579 10.82,20.585 10.82,20.585ZM27.31,17.408L24.194,20.585L21.447,19.333L20.308,21.726L24.193,20.585L24.07,23.733L24.194,20.585L27.31,17.408ZM7.689,17.408L15.406,17.752L15.406,17.751L7.689,17.408L7.689,17.408Z" style="fill:none;fill-rule:nonzero;stroke:black;stroke-width:0.5px;"/></g>',
      '</svg>'
    ));
  }

  modifier canMint() {
    require(_myTotalSupply < MAX_SUPPLY, 'All tickets have been minted.');
    require(block.timestamp < mintDeadline, 'Minting period has expired.');
    require(vipTicketPrice == msg.value || gaTicketPrice == msg.value, "Ether value sent is not correct.");
    _; // Underscores used in function modifiers return and continue execution of the decorated function
  }

  function mintItem() public payable canMint returns (uint256) {
    // canMint happens first or throws

    _tokenIds.increment();
    uint256 id = _tokenIds.current();
    _safeMint(msg.sender, id);

    if (msg.value == vipTicketPrice) {
      vipTicketHolders[id] = true;
    }

    _myTotalSupply++;
    payable(_owner).transfer(msg.value);

    return (id);
  }

  function tokenURI(uint256 id) public view override returns (string memory) {
    require(_exists(id), "not exist");
    string memory name = string(abi.encodePacked('Ticket #', id.toString() ));
    string memory description = string(abi.encodePacked((vipTicketHolders[id] ? "VIP" : "General Admission"), ' access to Foxcon2022 on Dec, 10, 2022.'));

    bytes memory tokenJsonString = bytes(abi.encodePacked(
      '{"name":"', name, '","description":"',description,'",', //'"external_url":"https://dappblitz.eth/', id.toString(), '.svg",', 
      '"attributes":[{"trait_type":"Ticket Type", "value":"', (vipTicketHolders[id] ? "VIP" : "GA"),  '"}],',
      '"owner":"', (uint160(ownerOf(id))).toHexString(20),'",',
      '"image":"',generateNftSvgByTokenId(id),'"}'
    ));

    return string(
      abi.encodePacked(
        'data:application/json;base64,',
        Base64.encode(bytes(tokenJsonString))
      )
    );
  }

  /* 
    // * size added 9.92KB
  */
  function generateNftSvgByTokenId(uint256 id) public view returns (string memory) {
    return string(abi.encodePacked(
      'data:image/svg+xml;base64,',
      Base64.encode(bytes(abi.encodePacked(
        '<svg preserveAspectRatio="xMinYMin meet" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" style="fill-rule:evenodd;clip-rule:evenodd;user-select: none;">',
          renderNftSvgBottomById(id),
          renderNftSvgTopById(id),
          '<style>.s1{font-family:"BalooDa2-ExtraBold";} .s4{font-family:"BalooDa2-Regular";} .s3{font-size:108px;} .s5{fill:#FFF;} .s2{fill:#FF9200;} .s6{fill:#3C3C3C;} .s7{fill:#532775;}</style>',
        '</svg>'
      ))
    )));
  }
  function renderNftSvgTopById(uint256 id) internal view returns (string memory) {
    return string(abi.encodePacked(
      '<g id="top" transform="matrix(0.99784,0,0,1,2.87767e-18,0)"><path class="',(vipTicketHolders[id] ? "s6" : "s7"), '" d="M30,200L20,200C20,188.962 11.038,180 0,180L0,15.368C0,6.886 6.886,0 15.368,0L285.281,0C293.763,0 300.649,6.886 300.649,15.368L300.649,180.033L300,180C288.962,180 280,188.962 280,200L270,200L270,199L264.99,199L264.99,200L260.981,200L260.981,199L255.971,199L255.971,200L251.962,200L251.962,199L246.952,199L246.952,200L242.944,200L242.944,199L237.933,199L237.933,200L233.925,200L233.925,199L228.914,199L228.914,200L224.906,200L224.906,199L219.896,199L219.896,200L215.887,200L215.887,199L210.877,199L210.877,200L206.367,200L206.367,199L201.357,199L201.357,200L197.349,200L197.349,199L192.338,199L192.338,200L188.33,200L188.33,199L183.319,199L183.319,200L179.311,200L179.311,199L174.301,199L174.301,200L170.292,200L170.292,199L165.282,199L165.282,200L161.273,200L161.273,199L156.263,199L156.263,200L152.255,200L152.255,199L147.244,199L147.244,200L143.236,200L143.236,199L138.225,199L138.225,200L134.217,200L134.217,199L129.207,199L129.207,200L125.198,200L125.198,199L120.188,199L120.188,200L116.18,200L116.18,199L111.169,199L111.169,200L107.161,200L107.161,199L102.15,199L102.15,200L98.142,200L98.142,199L93.132,199L93.132,200L89.123,200L89.123,199L84.113,199L84.113,200L80.104,200L80.104,199L75.094,199L75.094,200L71.086,200L71.086,199L66.075,199L66.075,200L62.067,200L62.067,199L57.056,199L57.056,200L53.048,200L53.048,199L48.038,199L48.038,200L44.029,200L44.029,199L39.019,199L39.019,200L35.01,200L35.01,199L30,199L30,200Z" /></g>',
      '<g id="ticketNumber" transform="matrix(0.759459,0,0,0.759459,-97.1428,-1.84609)"><text x="392px" y="208px" text-align="end" class="s1 s2" style="font-size:36px;">#',id.toString(),'</text></g>',
      '<g id="dateText" transform="matrix(0.955615,0,0,0.891404,-0.890378,-58.3668)"><text x="24px" y="240px" class="s4 s5" style="font-size:30px;">10 DEC / ',(vipTicketHolders[id] ? "VIP" : "GA"),'</text></g>',
      '<g id="event" transform="matrix(1.06305,0,0,1.06305,-130.636,-63.8082)"><path id="01F" d="M142.518,87.342L173.881,87.342L173.881,98.119L154.373,98.119L154.373,119.136L169.678,119.136L169.678,129.914L154.373,129.914L154.373,162.786L142.518,162.786L142.518,87.342Z" class="s2" style="fill-rule:nonzero;"/><path id="02O" d="M196.73,163.864C190.91,163.864 186.455,162.212 183.366,158.906C180.276,155.601 178.731,150.931 178.731,144.895L178.731,105.233C178.731,99.197 180.276,94.527 183.366,91.222C186.455,87.916 190.91,86.264 196.73,86.264C202.55,86.264 207.005,87.916 210.095,91.222C213.184,94.527 214.729,99.197 214.729,105.233L214.729,144.895C214.729,150.931 213.184,155.601 210.095,158.906C207.005,162.212 202.55,163.864 196.73,163.864ZM196.73,153.086C200.826,153.086 202.873,150.607 202.873,145.65L202.873,104.478C202.873,99.521 200.826,97.042 196.73,97.042C192.634,97.042 190.587,99.521 190.587,104.478L190.587,145.65C190.587,150.607 192.634,153.086 196.73,153.086Z" class="s2" style="fill-rule:nonzero;"/><path id="03X" d="M231.435,124.202L218.393,87.342L230.896,87.342L238.871,111.7L239.087,111.7L247.278,87.342L258.487,87.342L245.446,124.202L259.134,162.786L246.631,162.786L238.009,136.489L237.794,136.489L228.956,162.786L217.747,162.786L231.435,124.202Z" class="s2" style="fill-rule:nonzero;"/><path id="04C" d="M279.719,163.864C274.043,163.864 269.714,162.248 266.732,159.014C263.75,155.781 262.259,151.218 262.259,145.326L262.259,104.802C262.259,98.91 263.75,94.347 266.732,91.114C269.714,87.88 274.043,86.264 279.719,86.264C285.396,86.264 289.725,87.88 292.707,91.114C295.689,94.347 297.179,98.91 297.179,104.802L297.179,112.777L285.971,112.777L285.971,104.047C285.971,99.377 283.995,97.042 280.043,97.042C276.091,97.042 274.115,99.377 274.115,104.047L274.115,146.189C274.115,150.787 276.091,153.086 280.043,153.086C283.995,153.086 285.971,150.787 285.971,146.189L285.971,134.656L297.179,134.656L297.179,145.326C297.179,151.218 295.689,155.781 292.707,159.014C289.725,162.248 285.396,163.864 279.719,163.864Z" class="s2" style="fill-rule:nonzero;"/><path id="05O" d="M321.645,163.864C315.825,163.864 311.37,162.212 308.281,158.906C305.191,155.601 303.646,150.931 303.646,144.895L303.646,105.233C303.646,99.197 305.191,94.527 308.281,91.222C311.37,87.916 315.825,86.264 321.645,86.264C327.465,86.264 331.92,87.916 335.01,91.222C338.099,94.527 339.644,99.197 339.644,105.233L339.644,144.895C339.644,150.931 338.099,155.601 335.01,158.906C331.92,162.212 327.465,163.864 321.645,163.864ZM321.645,153.086C325.741,153.086 327.789,150.607 327.789,145.65L327.789,104.478C327.789,99.521 325.741,97.042 321.645,97.042C317.55,97.042 315.502,99.521 315.502,104.478L315.502,145.65C315.502,150.607 317.55,153.086 321.645,153.086Z" class="s2" style="fill-rule:nonzero;"/><path id="06N" d="M347.62,87.342L362.493,87.342L374.025,132.501L374.241,132.501L374.241,87.342L384.803,87.342L384.803,162.786L372.624,162.786L358.398,107.712L358.182,107.712L358.182,162.786L347.62,162.786L347.62,87.342Z" class="s2" style="fill-rule:nonzero;"/></g>'
    ));
  }
  function renderNftSvgBottomById(uint256 id) internal view returns (string memory) {
    string memory ticketType = vipTicketHolders[id] ? "VIP" : "General Admission";
    return string(abi.encodePacked(
      '<g id="stub1" transform="matrix(1.13574,0,0,1,-32.7365,0.204182)"><path class="',(vipTicketHolders[id] ? "s6" : "s7"), '" d="M266.04,199.796L274.826,199.796C274.826,210.834 282.7,219.796 292.398,219.796L292.968,219.763L292.968,284.428C292.968,292.91 286.918,299.796 279.466,299.796L42.326,299.796C34.874,299.796 28.824,292.91 28.824,284.428L28.824,219.796C38.522,219.796 46.395,210.834 46.395,199.796L55.181,199.796L55.181,200.796L59.583,200.796L59.583,199.796L63.105,199.796L63.105,200.796L67.507,200.796L67.507,199.796L71.029,199.796L71.029,200.796L75.431,200.796L75.431,199.796L78.952,199.796L78.952,200.796L83.354,200.796L83.354,199.796L86.876,199.796L86.876,200.796L91.278,200.796L91.278,199.796L94.8,199.796L94.8,200.796L99.202,200.796L99.202,199.796L102.724,199.796L102.724,200.796L107.126,200.796L107.126,199.796L110.647,199.796L110.647,200.796L115.049,200.796L115.049,199.796L118.571,199.796L118.571,200.796L122.973,200.796L122.973,199.796L126.495,199.796L126.495,200.796L130.897,200.796L130.897,199.796L134.418,199.796L134.418,200.796L138.821,200.796L138.821,199.796L142.342,199.796L142.342,200.796L146.744,200.796L146.744,199.796L150.266,199.796L150.266,200.796L154.668,200.796L154.668,199.796L158.19,199.796L158.19,200.796L162.592,200.796L162.592,199.796L166.113,199.796L166.113,200.796L170.515,200.796L170.515,199.796L174.037,199.796L174.037,200.796L178.439,200.796L178.439,199.796L181.961,199.796L181.961,200.796L186.363,200.796L186.363,199.796L189.885,199.796L189.885,200.796L194.287,200.796L194.287,199.796L197.808,199.796L197.808,200.796L202.21,200.796L202.21,199.796L205.732,199.796L205.732,200.796L210.134,200.796L210.134,199.796L214.096,199.796L214.096,200.796L218.498,200.796L218.498,199.796L222.02,199.796L222.02,200.796L226.422,200.796L226.422,199.796L229.943,199.796L229.943,200.796L234.345,200.796L234.345,199.796L237.867,199.796L237.867,200.796L242.269,200.796L242.269,199.796L245.791,199.796L245.791,200.796L250.193,200.796L250.193,199.796L253.714,199.796L253.714,200.796L258.117,200.796L258.117,199.796L261.638,199.796L261.638,200.796L266.04,200.796L266.04,199.796Z" /></g>',
      '<g id="stub2" transform="matrix(0.489601,0,0,0.489601,36.3616,34.5613)"><text x="78px" y="455px" class="s1 s3 s5">#',id.toString(),'</text></g>',
      '<g id="stub3" transform="matrix(0.160667,0,0,0.160667,66.1511,212.911)"><text x="62px" y="410px" class="s1 s3 s2">',ticketType,'</text></g>'
    ));
  }

}