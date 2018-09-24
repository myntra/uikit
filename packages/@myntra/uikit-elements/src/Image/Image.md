#### Example: Masonry Image List

```jsx render editor
const style = {'breakInside': 'avoid-column', 'listStyleType': 'none', 'marginBottom': '16px'}
;
<ul style={{'columnGap': '16px', 'columnCount': '5'}}>
    <li style={style}>
        <Image src="https://picsum.photos/200/200" width={200} height={200} />
    </li>
    <li style={style}>
        <Image src="https://picsum.photos/200/300" width={200} height={300} />
    </li>
    <li style={style}>
        <Image src="https://picsum.photos/200/100" width={200} height={100} />
    </li>
    <li style={style}>
        <Image src="https://picsum.photos/200/400" width={200} height={400} />
    </li>
    <li style={style}>
        <Image src="https://picsum.photos/400/300" width={400} height={300} />
    </li>
    <li style={style}>
        <Image src="https://picsum.photos/400/200" width={400} height={200} />
    </li>
    <li style={style}>
        <Image src="https://picsum.photos/200/200" width={200} height={200} />
    </li>
    <li style={style}>
        <Image src="https://picsum.photos/300/300" width={300} height={300} />
    </li>
    <li style={style}>
        <Image src="https://picsum.photos/300/500" />
    </li>
</ul>
```

#### Example: Grid Image List

```jsx render editor
    <>
        <Grid>
            <Grid.Column><Image src="https://picsum.photos/300/200?g1" height={200} width={300} /></Grid.Column>
            <Grid.Column><Image src="https://picsum.photos/300/200?g2" height={200} width={300} /></Grid.Column>
            <Grid.Column><Image src="https://picsum.photos/300/200?g3" height={200} width={300} /></Grid.Column>
            <Grid.Column><Image src="https://picsum.photos/300/200?g4" height={200} width={300} /></Grid.Column>
        </Grid>
        <Grid>
            <Grid.Column><Image src="https://picsum.photos/300/200?g6" height={200} width={300} /></Grid.Column>
            <Grid.Column><Image src="https://picsum.photos/300/200?g7" height={200} width={300} /></Grid.Column>
            <Grid.Column><Image src="https://picsum.photos/300/200?g8" height={200} width={300} /></Grid.Column>
            <Grid.Column><Image src="https://picsum.photos/300/200?g9" height={200} width={300} /></Grid.Column>
        </Grid>
    </>
```

#### Example: Error Handling

```jsx render editor
<Image src="somerandomurl.jpg" height={200}  />
```
