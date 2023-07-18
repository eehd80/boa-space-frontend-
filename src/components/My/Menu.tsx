import React from "react";
import styled from "styled-components";
import {
  Box,
  Button,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Show,
  Text,
  VisuallyHidden,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import _ from "lodash";

function MenuSns({ data }: { data?: any }) {
  return (
    <>
      {!_.isEmpty(data) && (
        <React.Fragment>
          <Show breakpoint="(max-width: 1023px)">
            <Box w="48px">
              <Menu>
                <MenuButton as={Button} variant="circle">
                  <span className="material-symbols-outlined" style={{ fontSize: "30px" }}>
                    more_horiz
                  </span>
                </MenuButton>
                <MenuList inset="0px 0px auto auto">
                  {data?.homepage || data?.webLink ? (
                    <MenuItem
                      as={Link}
                      to={data?.homepage ? data.homepage : data.webLink}
                      target="_blank"
                    >
                      <Image
                        src="/images/icon/sns_language.svg"
                        alt="Website"
                        mr="15px"
                        transform="scale(1.1)"
                      />
                      <Text variant="txt166">Website</Text>
                    </MenuItem>
                  ) : (
                    <MenuItem isDisabled={true}>
                      <Image
                        src="/images/icon/sns_language.svg"
                        alt="Website"
                        mr="15px"
                        transform="scale(1.1)"
                      />
                      <Text variant="txt166">Website</Text>
                    </MenuItem>
                  )}
                  {Object.prototype.hasOwnProperty.call(data, "twitter") &&
                    (data?.twitter ? (
                      <MenuItem as={Link} to={data?.twitter} target="_blank">
                        <Image
                          src="/images/icon/sns_twitter.svg"
                          alt="Twitter"
                          mr="15px"
                          transform="scale(1.2)"
                        />
                        <Text variant="txt166">Twitter</Text>
                      </MenuItem>
                    ) : (
                      <MenuItem isDisabled={true} justifyContent="flex-start">
                        <Image
                          src="/images/icon/sns_twitter.svg"
                          alt="Twitter"
                          mr="15px"
                          transform="scale(1.2)"
                        />
                        <Text variant="txt166">Twitter</Text>
                      </MenuItem>
                    ))}
                  {Object.prototype.hasOwnProperty.call(data, "instagram") &&
                    (data?.instagram ? (
                      <MenuItem as={Link} to={data?.instagram} target="_blank">
                        <Image
                          src="/images/icon/sns_instagram.svg"
                          alt="Instagram"
                          mr="15px"
                          transform="scale(1)"
                        />
                        <Text variant="txt166">Instagram</Text>
                      </MenuItem>
                    ) : (
                      <MenuItem isDisabled={true}>
                        <Image
                          src="/images/icon/sns_instagram.svg"
                          alt="Instagram"
                          mr="15px"
                          transform="scale(1)"
                        />
                        <Text variant="txt166">Instagram</Text>
                      </MenuItem>
                    ))}

                  {Object.prototype.hasOwnProperty.call(data, "youtube") &&
                    (data?.youtube ? (
                      <MenuItem as={Link} to={data?.youtube} target="_blank">
                        <Image
                          src="/images/comm/ico-youtube.svg"
                          alt="Youtube"
                          mr="15px"
                          transform="scale(1)"
                        />
                        <Text variant="txt166">Youtube</Text>
                      </MenuItem>
                    ) : (
                      <MenuItem isDisabled={true}>
                        <Image
                          src="/images/comm/ico-youtube.svg"
                          alt="Youtube"
                          mr="15px"
                          transform="scale(1)"
                        />
                        <Text variant="txt166">Youtube</Text>
                      </MenuItem>
                    ))}

                  {Object.prototype.hasOwnProperty.call(data, "discord") &&
                    (data?.discord ? (
                      <MenuItem as={Link} to={data.discord} w="170px" target="_blank">
                        <Image src="/images/icon/sns_discord.svg" alt="Discord" mr="15px" />
                        <Text variant="txt166">Discord</Text>
                      </MenuItem>
                    ) : (
                      <MenuItem isDisabled={true}>
                        <Image src="/images/icon/sns_discord.svg" alt="Discord" mr="15px" />
                        <Text variant="txt166">Discord</Text>
                      </MenuItem>
                    ))}

                  {Object.prototype.hasOwnProperty.call(data, "telegramLink") &&
                    (data?.telegramLink ? (
                      <MenuItem as={Link} to={`https://t.me/${data.telegramLink}`} target="_blank">
                        <Image
                          src="/images/icon/sns_telegram.svg"
                          alt="Telegram"
                          mr="15px"
                          transform="scale(1.1)"
                        />
                        <Text variant="txt166">Telegram</Text>
                      </MenuItem>
                    ) : (
                      <MenuItem isDisabled={true}>
                        <Image
                          src="/images/icon/sns_telegram.svg"
                          alt="Telegram"
                          mr="15px"
                          transform="scale(1.1)"
                        />
                        <Text variant="txt166">Telegram</Text>
                      </MenuItem>
                    ))}

                  {Object.prototype.hasOwnProperty.call(data, "mediumLink") &&
                    (data?.mediumLink ? (
                      <MenuItem
                        as={Link}
                        to={`https://www.medium.com/${data.mediumLink}`}
                        target="_blank"
                      >
                        <Image
                          src="/images/icon/sns_medium.svg"
                          alt="Medium"
                          mr="15px"
                          transform="scale(1)"
                        />
                        <Text variant="txt166">Medium</Text>
                      </MenuItem>
                    ) : (
                      <MenuItem isDisabled={true}>
                        <Image
                          src="/images/icon/sns_medium.svg"
                          alt="Medium"
                          mr="15px"
                          transform="scale(1)"
                        />
                        <Text variant="txt166">Medium</Text>
                      </MenuItem>
                    ))}
                </MenuList>
              </Menu>
            </Box>
          </Show>
          <Show breakpoint="(min-width: 1024px)">
            <SnsWrap spacing="0">
              {data?.homepage || data?.webLink ? (
                <Link to={data?.homepage ? data.homepage : data.webLink} target="_blank">
                  <Image
                    src="/images/icon/sns_language.svg"
                    alt="Website"
                    mr="15px"
                    transform="scale(1.1)"
                  />
                  <VisuallyHidden>Website</VisuallyHidden>
                </Link>
              ) : (
                <Button isDisabled={true}>
                  <Image src="/images/icon/sns_language.svg" alt="Website" transform="scale(1.1)" />
                </Button>
              )}

              {Object.prototype.hasOwnProperty.call(data, "twitter") &&
                (data?.twitter ? (
                  <Link to={data.twitter} target="_blank">
                    <Image
                      src="/images/icon/sns_twitter.svg"
                      alt="Twitter"
                      mr="15px"
                      transform="scale(1.2)"
                    />
                    <VisuallyHidden>Twitter</VisuallyHidden>
                  </Link>
                ) : (
                  <Button isDisabled={true}>
                    <Image
                      src="/images/icon/sns_twitter.svg"
                      alt="Twitter"
                      transform="scale(1.2)"
                    />
                    <VisuallyHidden>Twitter</VisuallyHidden>
                  </Button>
                ))}

              {Object.prototype.hasOwnProperty.call(data, "instagram") &&
                (data?.instagram ? (
                  <Link to={data.instagram} target="_blank">
                    <Image
                      src="/images/icon/sns_instagram.svg"
                      alt="Instagram"
                      mr="15px"
                      transform="scale(1)"
                    />
                    <VisuallyHidden>Instagram</VisuallyHidden>
                  </Link>
                ) : (
                  <Button isDisabled={true}>
                    <Image
                      src="/images/icon/sns_instagram.svg"
                      alt="Instagram"
                      transform="scale(1)"
                    />
                    <VisuallyHidden>Instagram</VisuallyHidden>
                  </Button>
                ))}

              {Object.prototype.hasOwnProperty.call(data, "youtube") &&
                (data?.youtube ? (
                  <Link to={data.youtube} target="_blank">
                    <Image
                      src="/images/comm/ico-youtube.svg"
                      alt="Instagram"
                      mr="15px"
                      transform="scale(1)"
                    />
                    <VisuallyHidden>Youtube</VisuallyHidden>
                  </Link>
                ) : (
                  <Button isDisabled={true}>
                    <Image
                      src="/images/comm/ico-youtube.svg"
                      alt="Instagram"
                      mr="15px"
                      transform="scale(1)"
                    />
                    <VisuallyHidden>Youtube</VisuallyHidden>
                  </Button>
                ))}

              {Object.prototype.hasOwnProperty.call(data, "discord") &&
                (data?.discord ? (
                  <Link to={data.discord} target="_blank">
                    <Image src="/images/icon/sns_discord.svg" alt="Discord" mr="15px" />
                    <VisuallyHidden>Discord</VisuallyHidden>
                  </Link>
                ) : (
                  <Button isDisabled={true}>
                    <Image src="/images/icon/sns_discord.svg" alt="Discord" mr="15px" />
                    <VisuallyHidden>Discord</VisuallyHidden>
                  </Button>
                ))}

              {Object.prototype.hasOwnProperty.call(data, "telegramLink") &&
                (data?.telegramLink ? (
                  <Link to={`https://t.me/${data.telegramLink}`} target="_blank">
                    <Image
                      src="/images/icon/sns_telegram.svg"
                      alt="Telegram"
                      mr="15px"
                      transform="scale(1.1)"
                    />
                    <VisuallyHidden>Telegram</VisuallyHidden>
                  </Link>
                ) : (
                  <Button isDisabled={true}>
                    <Image
                      src="/images/icon/sns_telegram.svg"
                      alt="Telegram"
                      mr="15px"
                      transform="scale(1.1)"
                    />
                    <VisuallyHidden>Telegram</VisuallyHidden>
                  </Button>
                ))}
              {Object.prototype.hasOwnProperty.call(data, "mediumLink") &&
                (data?.mediumLink ? (
                  <Link to={`https://www.medium.com/${data.mediumLink}`} target="_blank">
                    <Image
                      src="/images/icon/sns_medium.svg"
                      alt="Medium"
                      mr="15px"
                      transform="scale(1)"
                    />
                    <VisuallyHidden>Medium</VisuallyHidden>
                  </Link>
                ) : (
                  <Button isDisabled={true}>
                    <Image
                      src="/images/icon/sns_medium.svg"
                      alt="Medium"
                      mr="15px"
                      transform="scale(1)"
                    />
                    <VisuallyHidden>Medium</VisuallyHidden>
                  </Button>
                ))}
            </SnsWrap>
          </Show>
        </React.Fragment>
      )}
    </>
  );
}
export default React.memo(MenuSns);

const SnsWrap = styled(HStack)`
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    &:hover {
      background: #443f5b;
    }
    img {
      margin-right: 0;
    }
  }
`;
